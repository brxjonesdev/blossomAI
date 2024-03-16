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
          <header className='mx-12 flex items-center justify-between gap-2 pt-4'>
            {/* <Icon/> */}
            <p className='text-lg font-bold text-blsm_primary'>BlossomAI</p>
            <div className='md:hidden'>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
