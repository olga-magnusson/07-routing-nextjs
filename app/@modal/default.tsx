// app/@modal/default.tsx
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: ()=> void;
  isOpen: boolean;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null; 
  
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div 
      onClick={(e) => e.stopPropagation()}
      style={{ background: "#fff", padding: 20, borderRadius: 8, maxWidth: "90%", maxHeight: "90%", overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}