import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Image src="/logo-256.png" alt="logo" width={40} height={40} />
      <span className="text-lg font-bold">Green Card Inc.</span>
    </Link>
  );
};

export default Logo;
