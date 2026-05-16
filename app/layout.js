export const metadata = {
  title: 'Link Manager',
  description: 'System Gateway',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body { background-color: #f5f5f5; padding-top: 40px; }
            .trim-box { margin: 20px auto; max-width: 600px; background: #fff; padding: 25px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
            .trim-box-header { border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; }
          `
        }} />
      </head>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}
