import React from "react";

import { ToastContainer } from "react-toastify";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

export const metadata = {
  title: "ລັດດາ ອາໄຫຼ່ - SKV group",
  icons: {
    icon: "/logolatda.svg", // hoặc .ico, .svg
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <HeroUIProvider>
          <ToastContainer />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
