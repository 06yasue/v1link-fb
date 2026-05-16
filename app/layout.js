import './globals.css';

// ==========================================
// PENGATURAN SEO & META TAG GLOBAL
// ==========================================
export const metadata = {
  title: 'V1LINK - Advanced Link Management',
  description: 'Secure, fast, and reliable URL management and traffic routing system. Optimize your links with real-time analytics.',
  icons: {
    // Icon (Favicon) yang muncul di tab browser
    icon: 'https://i.ibb.co.com/Wv8PkgMS/noun-link-4166490-064771.png', 
    apple: 'https://i.ibb.co.com/Wv8PkgMS/noun-link-4166490-064771.png',
  },
  openGraph: {
    title: 'V1LINK - Advanced Link Management',
    description: 'Secure, fast, and reliable URL management and traffic routing system.',
    url: 'https://v1link-fb.vercel.app',
    siteName: 'V1LINK',
    images: [
      {
        // Gambar Thumbnail yang muncul saat link V1LINK dibagikan di Sosmed/WhatsApp
        url: 'https://i.ibb.co.com/zTpXJ2Mp/1773595455531.jpg', 
        width: 1200,
        height: 630,
        alt: 'V1LINK System Thumbnail',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ========================================== */}
        {/* PENGATURAN GOOGLE FONTS: Noto Sans JP       */}
        {/* ========================================== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" />
        
        {/* Memanggil Bootstrap 3 dan Google Icons via CDN */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        {/* Script jQuery & Bootstrap untuk dukung fungsionalitas klasik (jika ada) */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        {/* Timpa font bawaan Bootstrap dengan Noto Sans JP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: 'Noto Sans JP', sans-serif !important;
            }
          `
        }} />
      </head>
      
      <body>
        {/* Pembungkus <div className="container"> DIHAPUS DARI SINI.
          Ini akan membuat halaman 404 (dan halaman utama) bisa membentang 100% full layar.
        */}
        {children}
      </body>
    </html>
  );
}
