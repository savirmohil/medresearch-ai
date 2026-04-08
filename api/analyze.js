export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  const prompt = `You are a medical research analyst. Analyze this research paper and respond ONLY with a valid JSON object, no markdown, no backticks, no preamble.

JSON structure:
{
  "summary": "2-3 sentence plain english explanation of what the study found",
  "stats": [
    {"label": "Sample size", "value": "..."},
    {"label": "Study type", "value": "..."},
    {"label": "Follow-up", "value": "..."},
    {"label": "Primary outcome", "value": "..."}
  ],
  "relevanceScore": <integer 1-10>,
  "relevanceReason": "one sentence explanation of the score",
  "limitations": ["limitation 1", "limitation 2", "limitation 3"],
  "nextQuestions": ["question 1", "question 2", "question 3", "question 4"]
}

Paper:
${text}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const raw = data.content.map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
}
