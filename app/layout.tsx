import { Sidebar } from "../components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ml-[32ch] p-8">
          <div className="max-w-[80ch]">{children}</div>
        </div>
        <Sidebar />
      </body>
    </html>
  );
}
