import { ReactNode } from "react";
import SidebarNotes from "./@sidebar/default";

interface LayoutProps {
  children: ReactNode;
}

export default function FilterLayout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <SidebarNotes />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}