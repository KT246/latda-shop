// "use client"; // This must be at the top if you're using client-side features

import React from "react";
// import TopLoadingBar from "react-top-loading-bar";
// import { usePathname, useSearchParams } from "next/navigation";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [progress, setProgress] = useState(0);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   // Reset progress when route changes
  //   setProgress(30);
  //   const timer = setTimeout(() => setProgress(100), 500);

  //   return () => clearTimeout(timer);
  // }, [pathname, searchParams]); // Triggered on route change

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ToastContainer />
        {/* <TopLoadingBar
          color="#00FF00"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
