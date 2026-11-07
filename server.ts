import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Helper to get GoogleGenAI client
function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please configure it in your environment or Settings > Secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Available AI Models metadata
const AVAILABLE_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    provider: 'Google',
    badge: 'Fast & Smart',
    tag: 'Recommended',
    description: 'High-speed reasoning, multilingual mastery, and low latency for chat.',
    supportsStreaming: true,
    isFree: true,
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    provider: 'Google',
    badge: 'Ultra Fast',
    tag: 'Lightweight',
    description: 'Instant response time, optimized for mobile devices and quick queries.',
    supportsStreaming: true,
    isFree: true,
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 (OpenRouter)',
    provider: 'OpenRouter',
    badge: 'Reasoning',
    tag: 'OpenRouter Ready',
    description: 'Advanced open-weight reasoning model via OpenRouter API.',
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B (OpenRouter)',
    provider: 'OpenRouter',
    badge: 'Powerful',
    tag: 'OpenRouter Ready',
    description: 'Meta flagship open-weight model with broad general intelligence.',
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B (OpenRouter)',
    provider: 'OpenRouter',
    badge: 'Compact',
    tag: 'OpenRouter Ready',
    description: 'Efficient, multilingual French & European language excellence.',
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    openrouterConfigured: Boolean(process.env.OPENROUTER_API_KEY),
    version: '1.0.0',
    app: 'MadaAI',
  });
});

// Models list endpoint
app.get('/api/models', (req, res) => {
  res.json({
    models: AVAILABLE_MODELS,
    defaultModel: 'gemini-3.8-flash',
  });
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      model = 'gemini-3.8-flash',
      systemInstruction,
      language = 'mg',
      customApiKey,
      customApiUrl,
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required and cannot be empty.' });
    }

    // Default system instructions per language
    let langContext = '';
    if (language === 'mg') {
      langContext = `Ianao dia MadaAI, mpanampy marani-tsaina manokana ho an'i Madagasikara sy izao tontolo izao.
Manana fahaizana ambony amin'ny fiteny Malagasy (teny ofisialy, teny fiteny andavanandro, ary teny ara-kolontsaina toy ny ohabolana sy tantara).
Valio amin'ny teny Malagasy madio, mazava, manaja, ary mahasoa ny fanontaniana rehetra raha tsy hoe nangataka teny hafa manokana ny mpampiasa.
Raha misy teny ara-teknika na ara-tsiansa sarotra adika dia hazavao tsara amin'ny fomba mora azo.`;
    } else if (language === 'fr') {
      langContext = `Vous êtes MadaAI, un assistant d'intelligence artificielle moderne, bienveillant et hautement compétent, conçu pour Madagascar et le monde entier.
Vous maîtrisez parfaitement le français, le malgache et l'anglais.
Fournissez des réponses structurées, claires, précises et professionnelles avec une excellente mise en page.`;
    } else {
      langContext = `You are MadaAI, a professional, modern AI assistant built for Madagascar and global users.
You possess deep knowledge of technology, science, coding, business, and Malagasy language and culture.
Provide articulate, concise, accurate, and beautifully structured responses with Markdown formatting.`;
    }

    const finalSystemPrompt = systemInstruction
      ? `${langContext}\n\nAdditional Instructions:\n${systemInstruction}`
      : langContext;

    // Check if targeting OpenRouter or custom endpoint
    const isOpenRouterModel = model.includes('/') || model.includes('openrouter');
    const openrouterApiKey = customApiKey || process.env.OPENROUTER_API_KEY;

    if (customApiUrl) {
      // Custom user-configured external API endpoint (e.g. self-hosted LLM, Cloudflare Worker, or OpenRouter proxy)
      const targetUrl = customApiUrl;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (customApiKey) {
        headers['Authorization'] = `Bearer ${customApiKey}`;
      }

      const formattedMessages = [
        { role: 'system', content: finalSystemPrompt },
        ...messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
      ];

      const proxyResponse = await fetch(targetUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          stream: false,
        }),
      });

      if (!proxyResponse.ok) {
        const errText = await proxyResponse.text();
        return res.status(proxyResponse.status).json({
          error: `External API responded with status ${proxyResponse.status}: ${errText.slice(0, 300)}`,
        });
      }

      const proxyData: any = await proxyResponse.json();
      const replyContent =
        proxyData?.choices?.[0]?.message?.content ||
        proxyData?.response ||
        proxyData?.text ||
        'No response generated by external API.';

      return res.json({
        content: replyContent,
        model,
        provider: 'Custom Endpoint',
      });
    }

    if (isOpenRouterModel) {
      // If user selected an OpenRouter model
      if (!openrouterApiKey) {
        // Graceful fallback to Gemini 3.8 Flash with a note, so the chat never fails
        const ai = getGeminiClient();
        const geminiModel = 'gemini-3.8-flash';

        // Prepare contents for Gemini
        const chatHistory = messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: geminiModel,
          contents: chatHistory,
          config: {
            systemInstruction: `${finalSystemPrompt}\n\n[Note: User requested OpenRouter model "${model}". OpenRouter API key was not configured, so MadaAI seamlessly fulfilled this request with Gemini 3.8 Flash high-precision engine.]`,
          },
        });

        const reply = response.text || 'Tsy nisy valiny voaray.';
        return res.json({
          content: reply,
          model: `${model} (via Gemini 3.8 Flash)`,
          provider: 'MadaAI Engine',
          fallbackNotice: 'OpenRouter key not configured; seamlessly accelerated via Gemini 3.8 Flash.',
        });
      }

      // Call OpenRouter official API
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://mada-ai.local',
          'X-Title': 'MadaAI Chatbot',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: finalSystemPrompt },
            ...messages.map((m: any) => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content,
            })),
          ],
        }),
      });

      if (!openRouterResponse.ok) {
        const errorBody = await openRouterResponse.text();
        throw new Error(`OpenRouter Error (${openRouterResponse.status}): ${errorBody}`);
      }

      const data: any = await openRouterResponse.json();
      const content = data?.choices?.[0]?.message?.content || 'No text received from OpenRouter.';
      return res.json({
        content,
        model,
        provider: 'OpenRouter',
      });
    }

    // Default to Gemini API
    const ai = getGeminiClient(customApiKey);
    const validGeminiModel = model === 'gemini-3.1-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    // Format conversation history for Gemini SDK
    // The Gemini SDK generateContent accepts contents as array of { role, parts }
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(msg.content || '') }],
    }));

    const response = await ai.models.generateContent({
      model: validGeminiModel,
      contents,
      config: {
        systemInstruction: finalSystemPrompt,
      },
    });

    const reply = response.text || 'Tsy nisy valiny voaray.';

    return res.json({
      content: reply,
      model: validGeminiModel,
      provider: 'Google Gemini',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const message = error?.message || 'Nisy olana teo am-pikarakarana ny hafatra.';
    return res.status(500).json({
      error: message,
    });
  }
});

// Vite middleware and static serving setup
async function startServer() {
  if (!isProduction) {
    const fs = await import('fs');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Serve transformed index.html for SPA routes
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Serve static frontend in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MadaAI Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
