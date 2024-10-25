import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme',
  },
  description: 'Software de gestión comercial',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  manifest: '/manifest.json',
 
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
        <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
