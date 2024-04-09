import { NextResponse, NextRequest } from 'next/server';
import OpenAI from 'openai';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello, world!' });
}
export async function POST(req: NextRequest) {
  type UpdateProps = {
    action: string | null;
    body: string | null;
    created_at: string;
    id: number;
    message: string | null;
    number: string | null;
    parent_repo: number | null;
    sender: string | null;
    title: string | null;
    type: string | null;
  }[];

  const openai = new OpenAI();
  const body = await req.json();

  const updateFormatter = (updates: UpdateProps, style: any) => {
    const formattedUpdates = {
      updates: updates.map(
        ({ id, type, title, action, sender, message, created_at }) => ({
          id,
          type,
          title,
          action,
          sender,
          message,
          created_at,
        })
      ),
      parent_repo: updates[0].parent_repo,
      content_style: style,
      author: updates[0].sender,
    };
    return formattedUpdates;
  };
  const generateContent = async (formattedUpdates: {
    updates: {
      id: number;
      type: string | null;
      title: string | null;
      action: string | null;
      sender: string | null;
      message: string | null;
      created_at: string;
    }[];
    parent_repo: number | null;
    content_style: 'Social' | 'Blog' | 'LinkedIn';
    author: string | null;
  }) => {
    const styles = [
      {
        style: 'Social',
        prompt:
          'Using this data, Can you condense the recent updates on my project into a concise and engaging tweet, without referencing specific technical details like commits or pull requests? You are the person you made these updates, Response should be in the 1st person',
      },
      {
        style: 'Blog',
        prompt:
          "Using this data, Could you help me summarize the latest progress on my project in a more casual, conversational tone, as if I'm sharing it with friends, without referencing specific technical details like commits or pull requests with a minimum of 250 words? You are the person you made these updates, Response should be in the 1st person",
      },
      {
        style: 'Linkedin',
        prompt:
          'Using this data, Can you help me craft a project update for LinkedIn that includes a short paragraph and bullet points that highlights recent progress in a casual yet professional tone, without referencing specific technical details like commits or pull requests? You are the person you made these updates, Response should be in the 1st person',
      },
    ];
    const style = styles.find(
      (style) => style.style === formattedUpdates.content_style
    );

    console.log(style?.prompt, formattedUpdates);

    if (style && formattedUpdates) {
      const content = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: style.prompt,
          },
          {
            role: 'user',
            content: JSON.stringify(formattedUpdates),
          },
        ],
      });

      return content.choices[0].message.content;
    }
  };

  const response = await generateContent(
    updateFormatter(body.updates, body.contentType)
  );

  return NextResponse.json({
    blsmContent: response,
  });
}
