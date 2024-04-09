'use client';
import React from 'react';
import OpenAI from 'openai';
import axios from 'axios';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from './ui/button';
import { createBrowserClient } from '@supabase/ssr';

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

type ContentType = 'tweet' | 'short-post' | 'email' | 'other' | 'none';
interface ButtonProps {
  id: number;
  label: string;
}
export default function BLSMAI({
  repoName,
  updates,
}: {
  repoName: string;
  updates: UpdateProps;
}) {
  const [contentType, setContentType] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleButtonClick = (buttonId: number) => {
    setContentType(
      buttons.find((button) => button.id === buttonId)?.label ?? ''
    );
    setSelectedButton(buttonId);
  };

  const buttons: ButtonProps[] = [
    { id: 1, label: 'Social' },
    { id: 2, label: 'Blog' },
    { id: 3, label: 'Linkedin' },
  ];

  function generateContent() {
    setIsGenerating(true);
    fetch('https://blossom-ai-rose.vercel.app/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType: contentType,
        updates: updates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent(data.blsmContent);
        setIsGenerating(false);
      });
  }

  const saveGeneratedContent = async (
    response: string,
    repoID: string | number | null,
    author: string | null
  ) => {
    try {
      const { data, error } = await supabase.from('AI_Summaries').insert([
        {
          parent_repo: repoID,
          content: response,
          type: contentType,
          author: author,
        },
      ]);
      if (error) {
        throw error;
      }
      if (!error) {
        console.log(data, 'Data saved successfully');
      }

      // delete all updates used to generate content
      const { data: deleteData, error: deleteError } = await supabase
        .from('Updates')
        .delete()
        .eq('parent_repo', repoID);
      if (deleteError) {
        throw deleteError;
      }
      if (!deleteError) {
        // refresh the page
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <h3 className='hidden font-montserrat text-lg font-black md:block'>
          {`Recent Updates:`}
        </h3>

        <ul className=' hidden gap-4 md:flex'>
          {updates.map((update, i) => (
            <li key={i} className='flex flex-col gap-1 rounded-sm border-2 p-2'>
              <div className='flex flex-col'>
                <h3 className='text-md font-montserrat font-bold'>
                  {update.type}
                </h3>
                <p>{update.action ? update.action : 'made'}</p>
              </div>
              <p className='font-cabin text-sm'>{update.message}</p>
              <p className='font-cabin text-sm'>{update.body}</p>
            </li>
          ))}
        </ul>

        <Accordion type='single' collapsible className='md:hidden'>
          <AccordionItem value='yes'>
            <AccordionTrigger>
              <Label className='font-montserrat text-lg font-black'>
                Recent Updates
              </Label>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='flex flex-col gap-2'>
                {updates.map((update, i) => (
                  <li key={i} className='flex flex-col gap-1'>
                    <h3 className='text-sm font-bold'>
                      {update.type}
                      {' / '}
                      {update.action}
                    </h3>
                    <p className='text-xs'>{update.message}</p>
                    <p className='text-xs'>{update.body}</p>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='font-montserrat text-lg font-black'>
          {`What are you making it for ?`}
        </h2>

        <div className='flex flex-col gap-2 md:flex-row'>
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleButtonClick(button.id)}
              className={`
            ${
              selectedButton === button.id
                ? 'bg-blsm_primary text-blsm_black'
                : ''
            }
            w-full rounded-md border-2 p-2 font-cabin font-bold`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          className='flex w-full items-center justify-center gap-4 rounded-md border-2 bg-blsm_secondary p-2 font-cabin font-bold text-blsm_black disabled:cursor-not-allowed disabled:bg-blsm_black disabled:text-blsm_primary'
          onClick={() => generateContent()}
          disabled={!selectedButton}
        >
          {`Generate Content`}
          {isGenerating && (
            <div role='status' className=''>
              <svg
                aria-hidden='true'
                className='h-4 w-4 animate-spin fill-blsm_secondary text-blsm_black dark:text-blsm_accent'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-3'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='font-montserrat text-lg font-black'>Content</h2>
          <Button
            className='bg-blsm_primary p-2 font-cabin font-bold text-blsm_black'
            onClick={() => {
              navigator.clipboard.writeText(content);
            }}
            disabled={!content}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <textarea
          className='h-72 w-full rounded-md border-2 p-2 font-cabin font-bold'
          value={content}
          readOnly
        />
        {content && (
          <Button
            className='w-full bg-blsm_primary p-2 font-cabin font-bold text-blsm_black'
            onClick={() => {
              saveGeneratedContent(content, updates[0].parent_repo, updates[0].sender);
            }}
          >
            {`Save Generated Content`}
          </Button>
        )}
      </div>
    </section>
  );
}
