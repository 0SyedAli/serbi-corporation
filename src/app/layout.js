import { Open_Sans, Inter, Epilogue, Montserrat, Lato, Roboto, Poppins, Lora, Figtree, Lexend, Plus_Jakarta_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import BootstrapClients from "@/component/BootstrapClients";
import Providers from "@/component/Providers";
import ToastProvider from "@/component/ToastProvider";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata = {
  title: "",
  description: "",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${epilogue.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${interFont.variable} ${openSans.variable} ${lora.variable} ${figtree.variable} ${lexend.variable} ${plusJakartaSans.variable}`} cz-shortcut-listen="true">
        <ToastProvider /> {/* Global toast notifications */}
        <Providers>
          {children}
        </Providers>
        <BootstrapClients />
      </body>
    </html>
  );
}
