import AdminClientLayout from "./AdminClientLayout";
import "@/styles/globals.scss";

export const metadata = {
  title: "Адмін-панель | Княжа Вольниця",
  description: "Система керування контентом хору Княжа Вольниця",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootAdminLayout({ children }) {
  return (
    <html lang="uk">
      <body className="admin-body">
        <AdminClientLayout>{children}</AdminClientLayout>
      </body>
    </html>
  );
}
