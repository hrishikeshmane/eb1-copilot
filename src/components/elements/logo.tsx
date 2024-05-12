import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Image src="/logo-512.png" alt="logo" width={45} height={45} />
      <span className="text-lg font-bold">Greencard Inc</span>
    </Link>
  );
};

export default Logo;
