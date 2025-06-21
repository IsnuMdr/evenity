"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";

const Search = ({
  placeholder = "Search events...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSeach = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newUrl = "";

    if (query) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: query,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["query"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSeach} className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-3 rounded-full hover:bg-purple-700 transition"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
