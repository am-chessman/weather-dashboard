import "./globals.css";

export const metadata = {
  name: "Weather Dashboard",
  description: "A weather dashboard that displays the current weather and forecast for a given location."
}

export default function Layout({ children }) {
  return(
    <html>
      <head>
        <title>{metadata.name}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

