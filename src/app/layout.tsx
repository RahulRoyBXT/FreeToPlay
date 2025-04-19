import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./providers";

export const metadata: Metadata = {
  title: "Game App",
  description: "This is a Free Game info Application",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
