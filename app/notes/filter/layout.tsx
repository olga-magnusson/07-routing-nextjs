import { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
  siderbar: ReactNode;
}

export default function FilterLayout({ children, siderbar }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{width: 250}}>{siderbar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}