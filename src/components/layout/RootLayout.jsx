import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
