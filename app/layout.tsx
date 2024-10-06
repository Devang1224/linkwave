import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto_Mono } from 'next/font/google'

const robotoMono = localFont({
  src: "./fonts/RobotoMono-VariableFont_wght.ttf",
  variable: "--font-roboto-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
 

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_mono.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
