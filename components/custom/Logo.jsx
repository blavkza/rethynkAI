import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"} className="flex items-center  font-bold text-lg">
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        RE
      </span>
      :<span className="text-gray-900 dark:text-white">THYNK.AI</span>
    </Link>
  );
}

export default Logo;
