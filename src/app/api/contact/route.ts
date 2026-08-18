import { NextResponse } from 'next/server';

const DESTINATION_EMAIL = 'truthtadka@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, topic, message } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
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
    const senderName = name?.trim() || 'Anonymous User';
    const senderEmail = email?.trim() || 'no-reply@wordspin.app';

    // Prepare encoded payload for reliable email dispatch
    const formData = new URLSearchParams();
    formData.append('name', senderName);
    formData.append('email', senderEmail);
    formData.append('topic', topicTitle);
    formData.append('message', message.trim());
    formData.append('_subject', `Wordspin: [${topicTitle}] from ${senderName}`);
    formData.append('_template', 'box');
    formData.append('_captcha', 'false');

    const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Referer: 'https://wordspin.vercel.app/contact',
        Origin: 'https://wordspin.vercel.app',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      body: formData.toString(),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && (data?.success === 'true' || data?.success === true)) {
      return NextResponse.json({ success: true });
    }

    // Fallback if response was successful
    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: data?.message || 'Failed to deliver message. Please try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
