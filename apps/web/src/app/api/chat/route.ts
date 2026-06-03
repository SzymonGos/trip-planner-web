import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful travel assistant for a route-based trip planning app. Users will travel by their vehicle.
          
          - you will asnwer questions about the route, locations, and attractions along the way
          `,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_completion_tokens: 500,
      temperature: 0.7,
    });

    console.log('completion', completion.choices[0]?.message);

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 });
    }
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json({ error: 'OpenAI API error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
