import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Litter Paper 리터페이퍼 — 100% 내돈내산 반려동물 용품 검증 저널",
  description: "리터페이퍼(Litter Paper)는 대가성 협찬을 배제하고 연구 장비와 실측 데이터로 고양이 용품, 사료, 모래, 가전을 100% 내돈내산으로 검증하는 에디토리얼 미디어입니다.",
  keywords: ["리터페이퍼", "Litter Paper", "고양이용품", "내돈내산", "벤토나이트", "습식캔", "반려동물리뷰"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#333333] dark:bg-[#1A1A1A] dark:text-[#FAF8F5] selection:bg-[#C19A6B] selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
