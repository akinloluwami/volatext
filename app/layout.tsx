import Navbar from "@/components/Navbar";
import "./globals.css";

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
      <body>
        <Navbar />
        <div className="px-5">{children}</div>
      </body>
    </html>
  );
}
