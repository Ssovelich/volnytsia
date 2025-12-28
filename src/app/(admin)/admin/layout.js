import AdminClientLayout from "./AdminClientLayout";
import "@/styles/globals.scss";

export const metadata = {
  title: "Адмін-панель | Княжа Вольниця",
  description: "Система керування контентом хору Княжа Вольниця",
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
    <div className="admin-wrapper-context">
      <AdminClientLayout>{children}</AdminClientLayout>
    </div>
  );
}
