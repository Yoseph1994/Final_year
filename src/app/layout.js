import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/uiComponents/Navbar";
import Footer from "@/components/uiComponents/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RTKProvider from "@/slices/RtkProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AdventrueHub",
  description: "This project is finished",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RTKProvider>
          <Navbar />
          <div className="max-w-[1400px] mx-auto">{children}</div>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </RTKProvider>
      </body>
    </html>
  );
}
