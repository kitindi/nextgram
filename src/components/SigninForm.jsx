import Link from "next/link";
import React from "react";

const SigninForm = () => {
  return (
    <form className="w-full flex-col space-y-3">
      <div className="w-full">
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 text-gray-500 focus:outline-none text-sm"
          placeholder="Phone number, username or email"
        />
      </div>
      <div className="w-full">
        <input type="password" className="w-full border border-gray-300 px-3 py-2 text-gray-500 focus:outline-none text-sm" placeholder="Password" />
      </div>
      <div className="w-full">
        <Link href="/dashboard" className="w-full block text-center px-8 py-2 bg-blue-400 text-white font-medium rounded-lg">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;
