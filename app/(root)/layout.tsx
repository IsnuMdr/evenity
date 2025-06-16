import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import RouterEvents from "@/event/RouterEvent";
import ProgressProvider from "@/providers/ProgressProvider";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <ProgressProvider />
          <RouterEvents />
        </Suspense>
        {children}
      </main>
      <Footer />
    </div>
  );
}
