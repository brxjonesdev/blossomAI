import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Database } from '../../types/supabase';
import RepoSelect from '@/components/repo-select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RepoList from '../../components/repo-list';
import SettingsBTN from '../../components/settings-btn';
import { User } from 'lucide-react';
import UserInfo from '@/components/user-info';

export default async function Content() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
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
  // const { data, error: authError } = await supabase.auth.getUser();
  // if (authError || !data?.user) {
  //   redirect('/');
  // }

  const { data: reposfromDB, error } = await supabase
    .from('Repos')
    .select('id, repo_name, Updates(*)')
    .eq('owner', 'Braxton-Jones');

  let totalPullRequests = 0;
  let totalIssues = 0;
  let totalCommits = 0;
  let totalRepos = 0;
  reposfromDB?.forEach((repo) => {
    totalPullRequests += repo.Updates.filter(
      (update) => update.type === 'pull_request'
    ).length;
    totalIssues += repo.Updates.filter(
      (update) => update.type === 'issue'
    ).length;
    totalCommits += repo.Updates.filter(
      (update) => update.type === 'push'
    ).length;
    totalRepos++;
  });

  return (
    <>
      <UserInfo />
      <section className='flex grow flex-col items-center gap-6 rounded-md border-2 p-4 pt-8 font-montserrat'>
        {reposfromDB?.length === 0 ? (
          <>
            <div className='flex flex-col items-center justify-center gap-2 font-cabin text-lg'>
              <p className='text-center font-cabin text-sm'>
                {`You have no connected repositories. Connect a repository to get started!`}
              </p>
            </div>
          </>
        ) : (
          <RepoSelect reposfromDB={reposfromDB} />
        )}
      </section>
    </>
  );
}
