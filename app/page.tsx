import Image from 'next/image';
import Link from 'next/link';
import GithubAuthBtn from '@/components/login-btn';
export default function LandingPage() {
  return (
    <main className='font-montserrat grow flex justify-center'>
      <div className='flex gap-2 flex-col max-w-2xl text-center '>
        <section>
        <h1 className='text-3xl font-black text-center md:text-5xl'>{`Focus on your project's development while sharing it with the world.`}</h1>
        <p className='font-cabin text-center p-2 md:text-xl'>
          {`Streamline your project updates effortlessly with our platform. BlossomAI simplifies progress reporting for developers, integrating seamlessly with GitHub. Share your journey transparently and engage your audience effectively.`}
        </p>
        <GithubAuthBtn />
        </section>
        <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl font-black font-montserrat md:text-3xl'>How It Works</h2>
          <p className='font-cabin md:text-xl'>
            {`BlossomAI works by connecting directly to your GitHub repositories. Once linked, it monitors your commits and pull requests, intelligently generating update posts based on your activity. You can customize these posts before sharing them with your audience.`}</p>
          <p className='font-cabin md:text-xl'>
            {`Our platform analyzes your code changes and identifies significant updates to highlight. This ensures that your followers stay informed about your project's progress without overwhelming them with unnecessary details.`}
          </p>
        </section>
        <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
        <section className='flex flex-col gap-4'>
          <div>
        <h2 className='text-2xl font-black font-montserrat md:text-3xl'>{`Sounds Cool?`}</h2>
        <p className='font-cabin md:text-xl'>
          {`Get started by linking your GitHub account to BlossomAI. Once connected, you can start sharing your project updates with the world.`}
        </p>
        </div>  
        </section>
      </div>
    </main>
  );
}

