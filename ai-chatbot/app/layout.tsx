import SidebarContainer from '@/components/Sidebar/SidebarContainer';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-full">
        <div className="app-layout flex w-full h-[700px] overflow-hidden">
          <SidebarContainer />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
