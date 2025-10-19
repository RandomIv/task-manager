'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-background text-foreground">
        <main>{children}</main>
        <Toaster
            position="bottom-center"
            toastOptions={{
                duration: 5000,
            }}
        />
        </body>
        </html>
    );
}