// "use client";
// import React from "react";

// import { Dropdown, Menu } from "antd";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// const AuthLink = () => {
//   const { status } = useSession();
//   // console.log(status)

//   const menu = (
//     <Menu>
//       <Menu.Item key="1">
//         <Link href="/signin">Login</Link>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="2">
//         <Link href="/signup">Register</Link>
//       </Menu.Item>
//     </Menu>
//   );
//   return (
//     <div className=" flex">
//       <div>
//         <Dropdown overlay={menu} placement="bottomRight" arrow>
//           <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
//             {status === "unauthenticated" ? "Login" : "Account"}
//           </a>
//         </Dropdown>
//       </div>

//       {status === "unauthenticated" ? (
//         <Link href={"/signup"} className="hidden">
//           Login
//         </Link>
//       ) : (
//         <Link href={"/"} onClick={signOut} className="">
//           LogOut
//         </Link>
//       )}
//     </div>
//   );
// };

// export default AuthLink;

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AuthLink = () => {
  const { status } = useSession();

  return (
    <div className="flex items-center gap-x-4 relative">
      {status === "unauthenticated" && (
        <DropdownMenu>
        <DropdownMenuTrigger  >
          <span className=" hover:text-primary">Login</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={"/signin"} className="hover:text-primary">
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/signup'} className="hover:text-primary">Register</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )}

      {status === "authenticated" && (
        <>
          <button onClick={signOut} className="ml-2 hover:text-primary">
            LogOut
          </button>
        </>
      )}
    </div>
  );
};

export default AuthLink;
