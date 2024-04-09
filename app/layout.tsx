import type { Metadata } from 'next';
import { Montserrat, Cabin } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--montserrat',
});

const cabin = Cabin({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--cabin',
});

export const metadata: Metadata = {
  title: 'Blossom',
  description: 'cool & catchy description in progress!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={`${montserrat.variable} ${cabin.variable} bg-background text-blsm_text`}
      >
        <main className='flex min-h-screen flex-col items-center justify-center'>
          <header className='mx-12 my-3 flex justify-center '>
            {/* <Icon/> */}
            <p className='font-montserrat  text-lg font-black tracking-wide text-blsm_primary hover:text-blsm_accent'>
              <Link href='/home'>BlossomAI</Link>
            </p>
          </header>
          <Toaster />
          <section className='mx-4 flex w-full max-w-7xl flex-1 flex-col px-4 md:justify-center'>
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
