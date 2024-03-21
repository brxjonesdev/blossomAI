import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Icon from '@/components/blossom_logo';
import ThemeToggle from '@/components/theme-changer';

const nunito_sans = Nunito_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
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
      <body className={`${nunito_sans.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='flex min-h-screen flex-col items-center justify-center'>
            <header className='mx-12 my-3 flex justify-center '>
              {/* <Icon/> */}
              <p className='text-lg font-bold text-blsm_primary'>BlossomAI</p>
            </header>
            <section className='mx-4 flex w-full max-w-7xl flex-1 flex-col px-4 md:justify-center'>
              {children}
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
