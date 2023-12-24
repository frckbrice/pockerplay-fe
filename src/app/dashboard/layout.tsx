"use client";

import Overlay from "@/components/atoms/Overlay";
import MobileNav from "@/components/organisms/MobileNav";
import SideNav from "@/components/organisms/SideNav";
import TopNav from "@/components/organisms/TopNav";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex">
      <div className="mobile:max-sm:hidden">
        <SideNav />
      </div>
      {showNav && (
        <div className="hiddin mobile:max-sm:block z-50 fixed">
          <MobileNav onClick={() => setShowNav((prev) => !prev)} />
        </div>
      )}
      <div className="w-full">
        <TopNav onClick={() => setShowNav((prev) => !prev)} />
        <div>{children}</div>
      </div>
    </div>
  );
}
