import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageLoader from "@/components/PageLoader/PageLoader";
import StoreProvider from "@/app/(main)/StoreProvider";
import { Inter, Marmelad, Marck_Script } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export const metadata = {
  title: {
    default: "Княжа Вольниця",
    template: "%s | Княжа Вольниця",
  },
  description:
    "Сайт народного аматорського хору “Княжа Вольниця”. Колектив, що зберігає і примножує українські пісенні традиції. ",
  keywords: [
    "Княжа Вольниця",
    "народний хор",
    "аматорський хор",
    "українська пісня",
    "хорова музика",
    "фольклорний колектив",
    "українські традиції",
    "хор Київщина",
    "виступ хору",
    "народна творчість",
  ],
  openGraph: {
    title: "Княжа Вольниця | Народний аматорський хор",
    description: "Сайт народного аматорського хору “Княжа Вольниця”",
    url: "https://volnytsia.vercel.app/",
    siteName: "Княжа Вольниця",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Колектив хору Княжа Вольниця",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Княжа Вольниця | Народний аматорський хор",
    description: "Сайт народного аматорського хору “Княжа Вольниця”",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <div
      className={`${inter.variable} ${marmelad.variable} ${marckScript.variable}`}
    >
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
