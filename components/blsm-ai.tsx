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
  } from "@/components/ui/accordion"
  
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

const handleButtonClick = (buttonId: number) => {
    setContentType(buttons.find((button) => button.id === buttonId)?.label ?? '');
    setSelectedButton(buttonId);
};

const buttons: ButtonProps[] = [
    { id: 1, label: 'Social' },
    { id: 2, label: 'Blog' },
    { id: 3, label: 'Linkedin' },
];

function generateContent() {
    fetch('http://localhost:3000/api/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates, contentType}),
    })
        .then((res) => res.json())
        .then((data) => {
            // Handle the response data here
            setContent("Hello, world!");
            console.log(data);
        })
        .catch((error) => {
            // Handle any errors here
            console.error(error);
        });
} 


  return (
    <section className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <h3 className='font-montserrat text-lg font-black hidden md:block'>Recent Updates:</h3>

        <ul className=' gap-4 hidden md:flex'>
          {updates.map((update, i) => (
            <li key={i} className='flex flex-col gap-1 rounded-sm border-2 p-2'>
              <h3 className='text-md font-montserrat font-bold'>
                {update.type}
              </h3>
              <p className='font-cabin text-sm'>{update.message}</p>
              <p className='font-cabin text-sm'>{update.body}</p>
            </li>
          ))}
        </ul>

        <Accordion type='single' collapsible className='md:hidden'>
         <AccordionItem value='yes'>
            <AccordionTrigger>
                <Label className='text-lg font-montserrat font-black'>Recent Updates</Label>
            </AccordionTrigger>
            <AccordionContent>
                <ul className='flex flex-col gap-2'>
                {updates.map((update, i) => (
                    <li key={i} className='flex flex-col gap-1'>
                    <h3 className='text-sm font-bold'>{update.type}</h3>
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
    <h2 className='font-montserrat text-lg font-black'>What are you making it for ?</h2>


      <div className='flex gap-2 flex-col md:flex-row'>
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
            p-2 rounded-md border-2 w-full font-cabin font-bold`}
        >
          {button.label}
        </button>
      ))}
      </div>
    </div>
    
    <button 
    className='bg-blsm_secondary text-blsm_black p-2 rounded-md border-2 w-full font-cabin font-bold disabled:bg-blsm_black disabled:text-blsm_primary disabled:cursor-not-allowed' 
    onClick={() => generateContent()}
    disabled={!selectedButton}
    >
        Generate Content
    </button>

    {/* Content */}
    <div className=''>
        <h2 className='font-montserrat text-lg font-black'>Content</h2>
        <textarea
            className='w-full p-2 rounded-md border-2 font-cabin font-bold'
            value={content}
            readOnly
        />
    </div>
    </section>
  );
}
