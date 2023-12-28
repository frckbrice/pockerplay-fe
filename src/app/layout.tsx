import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "./nextToast";
import "react-toastify/dist/ReactToastify.min.css";
import { AppContextProvider } from "./Context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PockerPlay",
  description: "pockerPlay play and have fun",
  manifest: "/manifest.json",
  icons: { apple: "/public/icon-512x512.png" },
  // themeColor: "#1C0F32",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
