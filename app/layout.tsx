"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import * as gtag from "../utils/gtag";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
// export const metadata = {
//   title: "Volatext - Securely share texts online",
//   description: "Securely share texts online",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Volatext - Securely share texts online</title>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
      </Head>
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
