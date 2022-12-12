import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Layout from "../layouts";

// eslint-disable-next-line new-cap
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable} font-sans antialiased`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
