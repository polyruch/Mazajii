"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Logout = () => {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();
  if (!currentUser) {
    return null;
  }
  if (pathname === "/") {
    return (
      <Link href={"/dashboard"}>
        <Button text="Dashboard" />
      </Link>
    );
  }
  return <Button text="Logout" clickHandler={logout} />;
};

export default Logout;
