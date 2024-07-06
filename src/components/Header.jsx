import Image from "next/image";
import React from "react";
import instalogo from "../../public/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="shadow-sm border-b sticky top-0 p-2 lg:px-8 lg:py-4 flex flex-row items-center justify-between">
      {/* logo */}
      <Link href="/dashboard">
        <Image src="/logo-text.png" alt="instagram logo" width={200} height={200} className="w-28 lg:w-32 inline-block" />
      </Link>

      {/* Saerch Input */}
      <div>
        <input type="text" placeholder="Search" className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 max-w-[210px] px-4" />
      </div>
      {/* menu items */}
      <div></div>
    </div>
  );
};

export default Header;
