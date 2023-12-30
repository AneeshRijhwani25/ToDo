import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import Nav from "./Nav";
// import Socials from "./Socials";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className=" cursor-pointer" />
      </SheetTrigger>

      <SheetContent >
        <div className=" flex flex-col items-center justify-between h-full py-8">
          <div className=" flex flex-col items-center gap-y-12">
            <Link href="/">
            <Image src="/bikesbuddy.svg" width={150} height={150} priority alt="" />
            </Link>
            <Nav
              containerStyles="flex flex-col items-center gap-y-6"
              linkStyles="text-2xl"
            />
          </div>
          {/* <Socials containerStyle="flex gap-x-4" iconStyle="text-2xl" /> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
