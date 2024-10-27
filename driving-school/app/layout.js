import "./globals.css";
import "../public/css/style.css";
import "../public/css/fontiran.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "راهیاب",
  description: "hamyab app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
