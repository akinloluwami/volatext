import Navbar from "@/components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
export const metadata = {
  title: "Volatext - Securely share texts online",
  description: "Securely share texts online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <div className="px-5">
          {children}
          <Analytics />
          {/* <GoogleAnalytics /> */}
        </div>
      </body>
    </html>
  );
}
