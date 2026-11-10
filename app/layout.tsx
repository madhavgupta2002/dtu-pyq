import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/google-analytics';
import { REDIRECT_TARGET } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DTU Previous Year Questions (PYQ) Solutions',
  description:
    'Access and download DTU previous year question solutions by semester and department',
  // This site has moved to D.Tech; point crawlers at the new home.
  alternates: { canonical: REDIRECT_TARGET },
  robots: { index: false, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          `vercel.json` issues a 308 at the edge for every path. These two tags
          are the fallback for any HTML that is served anyway (stale CDN copy,
          a direct deployment URL, or local `next start`), so visitors always
          end up on the new site.
        */}
        <meta httpEquiv="refresh" content={`0; url=${REDIRECT_TARGET}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(REDIRECT_TARGET)});`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-08P16MS25G" />
      </body>
    </html>
  );
}
