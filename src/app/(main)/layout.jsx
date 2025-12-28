import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageLoader from "@/components/PageLoader/PageLoader";
import StoreProvider from "@/app/(main)/StoreProvider";
import { Inter, Marmelad, Marck_Script } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

// Метадані залишаються тут, Next.js автоматично об'єднає їх з метаданими сторінок
export const metadata = {
  title: {
    default: "Княжа Вольниця",
    template: "%s | Княжа Вольниця",
  },
  description: "Сайт народного аматорського хору “Княжа Вольниця”.",
  // ... решта ваших метаданих
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-family",
  display: "swap",
});

const marmelad = Marmelad({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--second-family",
  display: "swap",
});

const marckScript = Marck_Script({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--third-family",
  display: "swap",
});

export default function MainLayout({ children }) {
  return (
    // Огортаємо в div, щоб передати змінні шрифтів усьому контенту всередині body
    <div className={`${inter.variable} ${marmelad.variable} ${marckScript.variable}`}>
      <StoreProvider>
        <PageLoader />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </StoreProvider>
    </div>
  );
}