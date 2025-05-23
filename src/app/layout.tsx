// File: src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "스테이캐치",
  description: "빈방 취소 알림 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between p-4">
            {/* 로고 이미지로 변경 */}
            <Link href="/">
              <Image
                src="/images/logo.png"  /* public/images/logo.png 경로 */
                alt="스테이캐치 로고"
                width={120}
                height={32}
                priority
              />
            </Link>
            <ul className="flex space-x-4">
              <li><Link href="/">홈</Link></li>
              <li><Link href="/search">검색</Link></li>
              <li><Link href="/login">로그인</Link></li>
              <li><Link href="/signup">회원가입</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 text-center p-4">
          © 2025 스테이캐치
        </footer>
      </body>
    </html>
  );
}
