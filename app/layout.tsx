import { Sidebar } from "../components/sidebar";
import "./globals.css";
import "./prism.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Keith Bartholomew",
    default: "Keith Bartholomew",
  },
  authors: [
    { name: "Keith Bartholomew", url: "https://keithbartholomew.com/" },
  ],
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
};

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
          <div className="flex-auto p-4 md:p-8 md:w-3/4 max-w-[96ch]">
            {children}
          </div>
        </div>
        {/* https://plausible.io/js/script.js */}
        <script
          defer
          data-domain="keithbartholomew.com"
          src="/js/script.js"
        ></script>
      </body>
    </html>
  );
}
