import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "리터페이퍼 LITTER PAPER — 대한민국 프리미엄 고양이 에디토리얼",
  description: "리터페이퍼(LITTER PAPER)는 수의학 저널리즘, 행동 심리학, 사료 검증, AI 큐레이션을 가장 편안한 독서 경험으로 제공하는 미디어 플랫폼입니다.",
  keywords: ["리터페이퍼", "LITTER PAPER", "고양이", "수의학", "방광염", "묘종도감", "고양이사료", "반려묘"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Pretendard:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F7] text-[#202020] dark:bg-[#141815] dark:text-[#F2F5F3] selection:bg-[#E8DCC7] selection:text-[#3D5A40]">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
