import { Sidebar } from "../components/sidebar";
import "./globals.css";

export const metadata = {
  title: 'Keith Bartholomew'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-none md:max-w-[32ch] md:w-1/4">
            <div className="md:h-[100vh] md:border-r border-solid border-slate-100 md:sticky md:top-0">
              <Sidebar />
            </div>
          </div>
          <div className="flex-auto p-4 md:p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}