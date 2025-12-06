import "./globals.css";
import "../../public/css/style.css";
import "../../public/css/fontiran.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "راهیاب",
  description: "hamyab app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans">
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#27272a',
              color: '#fff',
              border: '1px solid #3f3f46',
            },
          }}
        />
        <div className="main-layout text-right">
          {children}
        </div>
      </body>
    </html>
  );
}
