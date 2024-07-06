import React from "react";
import Image from "next/image";
import Link from "next/link";
import instalogo from "../../public/logo.svg";

const listItems = [
  {
    title: "Home",
    link: "/dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="#000000" viewBox="0 0 256 256">
        <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path>
      </svg>
    ),
  },
  {
    title: "Search",
    link: "/search",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256" className="w-8 h-8">
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
      </svg>
    ),
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 flex flex-col space-y-6 w-[280px] min-w-[250px] border-r min-h-screen px-10 py-8">
      <Link href="/dashboard">
        <Image src="/logo-text.png" alt="instagram logo" width={200} height={200} className="w-28 lg:w-32 inline-block" />
      </Link>
      <div className="py-8">
        <ul className="flex flex-col space-y-6">
          {" "}
          {listItems.map((item) => (
            <Link href={item.link} key={item.title} className="flex gap-2 items-center text-lg ">
              <span>{item.icon}</span> {item.title}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
