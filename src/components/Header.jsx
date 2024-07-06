"use client";
import Image from "next/image";
import React from "react";
import instalogo from "../../public/logo.svg";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="p-2 grid grid-cols-12 lg:px-16 lg:py-8 items-center ">
      <div className="col-span-9 flex items-center space-x-4">
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
      </div>

      {/* Saerch Input */}
      <div className="col-span-3">
        {session ? (
          <div className="">
            <Image src={session.user.image} className="w-16 h-16 rounded-full" width={100} height={100} alt={session.user.name} />
            <p className="text-xs font-medium mt-2">{session.user.name}</p>
          </div>
        ) : (
          <div className="flex items-start space-x-3 ">
            <div className="w-14 h-14 rounded-full bg-black text-white text-2xl flex items-center justify-center font-bold">AS</div>
            <div className="py-2">
              <p className="text-[16px] font-semibold">Abdulaziz</p>
              <p className="text-sm">Abdulaziz Sadi</p>
            </div>
          </div>
        )}
      </div>
      {/* menu items */}
      <div></div>
    </div>
  );
};

export default Header;
