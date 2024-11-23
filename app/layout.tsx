import Menubar from "@/components/menubar";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation"
import { Metadata } from "next";

export const metadata : Metadata = {
  title: {
    template : "%s | Next.js",
    default : "NEXT.js Test Dev Space"
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
        <div className="min-h-screen">
          <div>
            <Menubar/>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
