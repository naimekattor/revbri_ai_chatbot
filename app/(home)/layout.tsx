import React from 'react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Landing Layout</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}