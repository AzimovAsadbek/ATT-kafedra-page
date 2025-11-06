import "./globals.css";

export const metadata = {
  title: "Axborot Tizimlari va Texnologiyalari Kafedrasi",
  description: "ATT kafedrasi rasmiy sahifasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
