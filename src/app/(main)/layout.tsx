import { AppProvider } from "@/context/AppContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <AppProvider>{children}</AppProvider>
    </body>
  );
}
