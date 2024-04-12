import Navigation from "@/components/navigation"
import { Metadata } from "next";

export const metadata : Metadata = {
  title: {
    template : "%s | Next.js",
    default : "Loading..."
  },
  description : 'Description for this Site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation/>
        {children}
      </body>
    </html>
  )
}
