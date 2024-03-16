import Image from 'next/image';
import ThemeToggle from '@/components/theme-changer';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main>
      <section className='my-8 flex flex-col items-center justify-center'>
        <h1 className='text-center text-6xl font-bold text-blsm_primary'>
          Welcome to Blossom
        </h1>
        <p className='text-center text-lg text-blsm_secondary'>
          A cool & catchy description in progress!
        </p>
      </section>
      <div className='text-center'>
        <Link
          href='/login'
          className='border:blsm_secondary rounded-sm border-2 p-5'
        >
          login
        </Link>
      </div>
    </main>
  );
}
