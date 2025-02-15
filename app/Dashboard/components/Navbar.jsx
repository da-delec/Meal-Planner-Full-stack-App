'use client'
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = ({ session }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [session?.user?.role]);

  const handleSignOut = async () => {
    const result = await signOut({ 
      redirect: false,
      callbackUrl: "/LoginPage"  // URL de redirection après déconnexion
    });
    router.push('/LoginPage');  // Redirection forcée
  };

  return (
    <div className=" text-white mx-auto items-center justify-between flex w-[96%] h-20 rounded-lg bg-gray-800">
      <h1 className=" text-2xl mx-3"> Welcome Back {session?.user?.firstName} {session?.user?.lastName}</h1>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="  h-12 w-12 bg-white rounded-full  mx-4">
          <img src={session?.user?.profileImage} alt="profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link href="/Dashboard/EditProfile">Edit your profile</Link>
          </li>
          <li>
            <a onClick={handleSignOut}>Logout</a>
          </li>
          <li>
            <Link href="/Dashboard">Dashboard</Link>
          </li>
          {isAdmin && (
            <li>
              <Link href="/Dashboard/Admin">Admin Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
