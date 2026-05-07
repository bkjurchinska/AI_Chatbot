import SidebarContainer from '@/components/Sidebar/SidebarContainer';
import Providers from '@/components/Providers/Providers';
import './globals.css';
import { Metadata, Viewport } from 'next';
import SWRegistration from '@/components/SWRegistration';

export const viewport: Viewport = {
  themeColor: 'rgba(8,8,18,0.98)',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PomodoroAI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>

      <body className="flex items-center justify-center h-full">
        <SWRegistration />
        <Providers>
          <div className="app-layout flex w-full h-[700px] overflow-hidden">
            <SidebarContainer />
            <main className="flex-1 flex flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
