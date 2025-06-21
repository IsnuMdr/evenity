// components/CustomUserDropdown.tsx
"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const CustomUserDropdown = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.firstName?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.fullName}</p>
          <p className="text-xs text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/user-profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">My Events</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button className="w-full text-left cursor-pointer">
            <SignOutButton>Sign Out</SignOutButton>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomUserDropdown;
