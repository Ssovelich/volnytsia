import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageLoader from "@/components/PageLoader/PageLoader";

import { Inter, Marmelad, Marck_Script } from "next/font/google";

export const metadata = {
  title: "Княжа Вольниця | Голована сторінка",
  description: 'Сайт народного аматорського хору "Княжа Вольниця"',
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

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${marmelad.variable} ${marckScript.variable}`}>
        <PageLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
