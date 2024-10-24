import "./globals.css";
import "../public/css/style.css";
import "../public/css/fontiran.css";

export const metadata = {
  title: "همیاب",
  description: "hamyab app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
