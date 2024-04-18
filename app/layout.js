import "./globals.css";
import MainHeaderPage from "@/components/maind-header/main-header";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderPage></MainHeaderPage>
        {children}
      </body>
    </html>
  );
}
