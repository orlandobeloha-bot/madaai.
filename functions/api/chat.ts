// Cloudflare Pages Function: /api/chat
// Deployed automatically on Cloudflare Pages when hosting this application.

interface Env {
  GEMINI_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const body: any = await request.json();

    const {
      messages,
      model = 'gemini-3.8-flash',
      systemInstruction,
      language = 'mg',
      customApiKey,
    } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Default Malagasy/French/English system context
    let langContext = '';
    if (language === 'mg') {
      langContext = `Ianao dia MadaAI, mpanampy marani-tsaina manokana ho an'i Madagasikara sy izao tontolo izao.
Manana fahaizana ambony amin'ny fiteny Malagasy. Valio amin'ny teny Malagasy madio, mazava, manaja, ary mahasoa ny fanontaniana rehetra.`;
    } else if (language === 'fr') {
      langContext = `Vous êtes MadaAI, un assistant d'intelligence artificielle moderne, bienveillant et hautement compétent, conçu pour Madagascar et le monde entier.`;
    } else {
      langContext = `You are MadaAI, a professional, modern AI assistant built for Madagascar and global users.`;
    }

    const finalSystemPrompt = systemInstruction
      ? `${langContext}\n\nAdditional Instructions:\n${systemInstruction}`
      : langContext;

    // Check OpenRouter
    const isOpenRouter = model.includes('/') || model.includes('openrouter');
    const openrouterKey = customApiKey || env.OPENROUTER_API_KEY;

    if (isOpenRouter && openrouterKey) {
      const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://mada-ai.pages.dev',
          'X-Title': 'MadaAI Chatbot',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: finalSystemPrompt },
            ...messages.map((m: any) => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content,
            })),
          ],
        }),
      });

      if (!orRes.ok) {
        const errText = await orRes.text();
        return new Response(JSON.stringify({ error: `OpenRouter error: ${errText}` }), {
          status: orRes.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const orData: any = await orRes.json();
      return new Response(
        JSON.stringify({
          content: orData?.choices?.[0]?.message?.content || 'No text received',
          model,
          provider: 'OpenRouter',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Default to Gemini API via Cloudflare Pages
    const geminiKey = customApiKey || env.GEMINI_API_KEY;
    if (!geminiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY is not configured in Cloudflare Pages Environment Variables.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiModel = model === 'gemini-3.1-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;

    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'aistudio-build',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: finalSystemPrompt }],
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(JSON.stringify({ error: `Gemini API error: ${errText}` }), {
        status: geminiRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const geminiData: any = await geminiRes.json();
    const replyText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Tsy nisy valiny voaray.';

    return new Response(
      JSON.stringify({
        content: replyText,
        model: geminiModel,
        provider: 'Google Gemini',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
