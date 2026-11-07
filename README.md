# MadaAI — Modern Multilingual AI Chatbot 🇲🇬

MadaAI is a professional, mobile-first artificial intelligence chatbot web application designed specifically for Madagascar and international users. It features native, first-class support for **Malagasy (Teny Malagasy)**, **French**, and **English**, with a high-performance multi-model architecture ready for **Google Gemini** and **OpenRouter**.

---

## ✨ Features

- 🇲🇬 **First-Class Malagasy Support**: Understands and writes fluent Malagasy, with cultural context, traditional proverbs (*ohabolana*), and formal/informal registers.
- 🇫🇷 🇬🇧 **Trilingual Interface**: Instant one-click toggle between Malagasy, French, and English across all UI labels and responses.
- 📱 **Mobile-First Responsive Design**: Intuitive drawer navigation, tactile message bubbles, auto-growing input bar, and high responsiveness on mobile 3G/4G/5G networks.
- 🌓 **Dark & Light Mode**: Seamless dark and light themes with Madagascar flag accents (emerald green, ruby crimson, crisp snow).
- 🤖 **Multi-Model Selector**:
  - `Gemini 3.8 Flash` (Default: ultra-fast, high reasoning, multilingual)
  - `Gemini 3.1 Flash Lite` (Ultra-fast, lightweight)
  - `DeepSeek R1` (OpenRouter Ready, advanced reasoning)
  - `Llama 3.3 70B` (OpenRouter Ready, Meta flagship)
  - `Mistral 7B` (OpenRouter Ready, French and coding excellence)
- 🔒 **Zero Frontend Key Exposure**: API keys are securely managed on the backend proxy server or Cloudflare Pages Functions; secrets are never leaked to client-side code.
- 💬 **Conversation Management**:
  - Persistent local conversation history in `localStorage`.
  - Create new conversations with one click.
  - Inline rename and individual conversation deletion.
  - "Clear all conversations" with safety confirmation modal.
  - Quick conversation search filter.
- 📋 **Response Tools**:
  - Instant response copy button with visual toast confirmation.
  - Speech Synthesis / Read Aloud audio reader.
  - One-click response regeneration.
  - Syntax-highlighted code blocks with dedicated "Copy code" button.
- 🌐 **Professional Landing Page**: Features showcase, statistics, interactive test prompts, architecture overview, and FAQ.
- ⚙️ **Configurable Endpoint & Settings**: Customize the API URL, connect personal OpenRouter keys, and configure Malagasy tone (*Ofisialy*, *Tsotra*, *Tanora*).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend / API**: Node.js, Express, `@google/genai` TypeScript SDK.
- **Edge Functions**: Cloudflare Pages Functions (`/functions/api/chat.ts`).
- **Build Tool**: Vite 8.

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/mada-ai.git
cd mada-ai
npm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```env
GEMINI_API_KEY="your-gemini-api-key"
OPENROUTER_API_KEY="your-optional-openrouter-key"
PORT=3000
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Cloudflare Pages

This project is pre-configured with Cloudflare Pages Functions in `/functions/api/chat.ts`:

1. Push your repository to **GitHub** or **GitLab**.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select your `mada-ai` repository.
4. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under **Environment variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `OPENROUTER_API_KEY` *(optional)*: Your OpenRouter API key.
6. Click **Save and Deploy**. Cloudflare Pages will build the static frontend and mount the edge API function at `/api/chat` automatically!

---

## 🐙 Deploying to GitHub

```bash
git init
git add .
git commit -m "Initial commit of MadaAI multilingual chatbot"
git branch -M main
git remote add origin https://github.com/your-username/mada-ai.git
git push -u origin main
```

---

## 📡 API Reference

### `POST /api/chat`

**Request Body (JSON):**
```json
{
  "messages": [
    { "role": "user", "content": "Manao ahoana MadaAI! Inona no azonao atao?" }
  ],
  "model": "gemini-3.8-flash",
  "language": "mg",
  "customApiKey": "optional-key",
  "systemInstruction": "optional-custom-prompt"
}
```

**Response (JSON):**
```json
{
  "content": "Manao ahoana tompoko! Faly miarahaba anao...",
  "model": "gemini-3.8-flash",
  "provider": "Google Gemini"
}
```

### `GET /api/models`
Returns list of curated AI models with tags, providers, and multilingual descriptions.

### `GET /api/health`
Health check status returning server timestamp and configuration flags.

---

## 📄 License

Apache-2.0. Built with pride for Madagascar and the world. 🇲🇬
