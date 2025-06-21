import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";
import CustomUserDropdown from "../common/CustomUserDropdown";

const Header = async () => {
  const { userId } = await auth();

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="wrapper flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="w-36">
              <Image
                src="/assets/images/logo.png"
                width={128}
                height={38}
                alt="Evenity logo"
              />
            </Link>
          </div>

          <nav className="hidden md:block">
            <NavItems />
          </nav>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <div className="text-white font-medium">{user?.firstName}</div>
              <CustomUserDropdown />
              <MobileNav />
            </SignedIn>
            <SignedOut>
              <Button
                asChild
                className="bg-white text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium"
                size="lg"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <MobileNav />
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
