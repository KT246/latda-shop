import React from "react";
import { Providers } from "./providers";

import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "LATDA Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
