import './globals.css'; // Memanggil global CSS

export const metadata = {
  title: 'Link Manager',
  description: 'System Gateway',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Memanggil Bootstrap 3 dan Google Icons via CDN */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}
