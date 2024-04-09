import Image from 'next/image';
import Link from 'next/link';
import GithubAuthBtn from '@/components/login-btn';
export default function LandingPage() {
  return (
    <main className='flex grow justify-center font-montserrat'>
      <div className='flex max-w-2xl flex-col gap-2 '>
        <section className='text-center'>
          <h1 className='text-center text-3xl font-black md:text-5xl'>{`Focus on your project's development while sharing it with the world.`}</h1>
          <p className='p-2 text-center font-cabin md:text-xl'>
            {`Streamline your project updates effortlessly with our platform. BlossomAI simplifies progress reporting for developers, integrating seamlessly with GitHub. Share your journey transparently and engage your audience effectively.`}
          </p>
          <GithubAuthBtn />
        </section>
        <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
        <section className='flex flex-col gap-4'>
          <h2 className='font-montserrat text-2xl font-black md:text-3xl'>
            {`How It Works`}
          </h2>
          <p className='font-cabin md:text-xl'>
            {`BlossomAI works by connecting directly to your GitHub repositories. Once linked, it monitors your commits and pull requests, intelligently generating update posts based on your activity. You can customize these posts before sharing them with your audience.`}
          </p>
          <p className='font-cabin md:text-xl'>
            {`Our platform analyzes your code changes and identifies significant updates to highlight. This ensures that your followers stay informed about your project's progress without overwhelming them with unnecessary details.`}
          </p>
        </section>
      </div>
    </main>
  );
}
