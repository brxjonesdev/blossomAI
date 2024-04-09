import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { redirect } from 'next/navigation';
import RepoList from './repo-list';
import SettingsBTN from './settings-btn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import CopyBtn from './copy-btn';

export default async function UserInfo() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) {
    // redirect('/');
    console.log('error in auth', authError);
  }

  const user = data?.user?.user_metadata;

  function convertToSimpleDateTime(dateTimeString: Date) {
    const dateTime = new Date(dateTimeString);

    // Extracting date components
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based
    const day = dateTime.getDate();

    // Extracting time components
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    // Constructing the simple date and time format
    const simpleDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return simpleDateTime;
  }

  const { data: contentData, error: contentError } = await supabase
    .from('AI_Summaries')
    .select('*')
    .eq('author', user?.user_name);
  if (contentError) {
    console.log('error in content', contentError);
  }
  if (contentData) {
    console.log('contentData', contentData);
  }

  return (
    <div className='flex min-w-[400px] max-w-[400px] flex-col gap-2 rounded-md border-2 p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2  '>
        <div className='flex items-center gap-5'>
          <Avatar>
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>
              <p>{user?.full_name?.charAt(0).toUpperCase()}</p>
            </AvatarFallback>
          </Avatar>
          <p className='text-lg font-bold'>
            {user?.preferred_username
              ? user?.preferred_username
              : user?.full_name}
          </p>
        </div>
        <SettingsBTN user={user} />
      </div>
      <Card className='font-montserrat'>
        <CardHeader>
          <CardTitle className=''>
            Connect your repo to{' '}
            <span className='font-bold text-blsm_accent'>BlossomAI</span>
          </CardTitle>
          <CardDescription className='py-1 text-xs'>
            `{`npx blsm-init ${user?.user_name} <repo-name>`}`
          </CardDescription>
          <CopyBtn text={`npx blsm-init ${user?.user_name} <repo-name>`} />
        </CardHeader>
        <CardContent className='font-cabin text-sm text-center flex flex-col gap-2'>
          <p className='text-left'>
            Connect your GitHub repositories to BlossomAI to receive updates on
            your repositories.
          </p>
          <Dialog>
            <DialogTrigger className='text-center'><p className='italic text-blsm_accent hover:underline '>How does this work?</p></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{`How BlossomAI (BLSM) works.`}</DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                  <p className='text-md font-cabin'>
                    {`BlossomAI is a tool that connects to your GitHub repositories
                    and listens for updates. When you link your repositories, you
                    will receive updates on your repositories.`}
                  </p>
                  <p className='text-md font-cabin'>
                    {`This works by using a github workflow that listens for updates. Right now I'm only tracking pull requests, issues, and commits.
                    If i think it would be useful to track other things, I'll add them.`}
                  </p>
                  <p className='text-md font-cabin'>
                   {` This was made as a way to keep track of updates on my own repositories, but I thought it would be useful to others as well.
                    It also helps me keep track of my own progress on my projects and share them with others. #buildinpublic <3`}
                  </p>

                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
      <RepoList user={user} />

      {contentData ? (
        <section>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='font-montserrat'>
                Generated Content
              </AccordionTrigger>
              <AccordionContent>
                {contentData?.map((content, i) => (
                  <div key={i} className='flex flex-col gap-2'>
                    <h3 className='font-montserrat text-lg font-black'>
                      {`${content.type} created at{' '}`}
                      {convertToSimpleDateTime(content.created_at)}
                    </h3>
                    <p className='font-cabin text-sm'>
                      {content.content.substring(0, 250)}...
                    </p>
                    <CopyBtn text={content.content} />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      ) : null}
    </div>
  );
}
