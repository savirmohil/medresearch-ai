# MedResearch AI

An AI-powered medical research paper analyzer built for VCU Health students and researchers.

Paste any research paper or abstract and get:
- Plain english summary
- Key statistics extracted automatically
- Clinical relevance score
- Study limitations flagged
- Follow-up research questions

**Built by [Savir Mohil](https://linkedin.com/in/savirrajsinghmohil) — VCU Computer Science**

---

## Deploy in 5 minutes

### 1. Get your Anthropic API key
Go to [console.anthropic.com](https://console.anthropic.com), sign up, and create an API key.

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medresearch-ai.git
git push -u origin main
```

### 3. Deploy to Vercel
- Go to [vercel.com](https://vercel.com) and sign in with GitHub
- Click "Add New Project" and import your repo
- Under "Environment Variables", add:
  - Key: `ANTHROPIC_API_KEY`
  - Value: your API key from step 1
- Click Deploy

That's it. Your app is live.

---

## Local development

```bash
npm install -g vercel
vercel dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Tech stack
- Frontend: Vanilla HTML/CSS/JS
- Backend: Vercel serverless functions (Node.js)
- AI: Claude claude-sonnet-4-20250514 via Anthropic API
