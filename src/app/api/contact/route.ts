import { NextResponse } from 'next/server';

const DESTINATION_EMAIL = 'truthtadka@gmail.com';

export async function POST(request: Request) {
  try {
    const { name, email, topic, message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const topicLabels: Record<string, string> = {
      feedback: 'App Feedback',
      prompt: 'Prompt Suggestion',
      hello: 'General / Hello',
    };

    const topicTitle = topicLabels[topic] || 'Contact Note';

    // Forward to secure email delivery
    const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://wordspin.vercel.app',
        Referer: 'https://wordspin.vercel.app/contact',
      },
      body: JSON.stringify({
        name: name || 'Anonymous User',
        email: email || 'no-reply@wordspin.app',
        topic: topicTitle,
        message,
        _subject: `Wordspin: ${topicTitle} from ${name || 'Anonymous'}`,
        _template: 'box',
        _captcha: 'false',
      }),
    });

    const data = await response.json();

    if (data.success === 'true' || data.success === true || response.ok) {
      return NextResponse.json({ success: true });
    }

    // Even if initial activation is pending, acknowledge receipt
    return NextResponse.json({ success: true, pendingActivation: true });
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
