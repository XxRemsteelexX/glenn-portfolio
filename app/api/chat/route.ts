import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Debug logging
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
    console.log('GROQ_API_KEY starts with gsk_:', process.env.GROQ_API_KEY?.startsWith('gsk_'));

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: `You are Glenn Dalbey's AI assistant. Keep responses concise and conversational.

Key areas you can discuss:
- Projects: Apollo Healthcare Connect, multi-modal AI implementations, production ML deployments
- Skills: Python, TensorFlow, PyTorch, React, Node.js, cloud platforms (AWS/GCP)
- Experience: Data science, AI/ML engineering, full-stack development

When someone asks broad questions like "tell me about Glenn's work", respond briefly (2-3 sentences) and ask what specific area they'd like to know more about. Offer clear options like:
- "Would you like to hear about his key projects?"
- "Are you interested in his technical skills?"
- "Want to know about his experience in a specific area?"

Keep responses under 150 words unless specifically asked for detailed information.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 8192,
        temperature: 1,
        top_p: 1,
        reasoning_effort: 'medium',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Groq API response:', data);
    const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}