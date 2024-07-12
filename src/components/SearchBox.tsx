"use client";

import React, { useRef, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { CiSearch } from "react-icons/ci";
import { recentSearchState } from "@/recoil/atoms/searchAtoms";
import { useRecoilState } from "recoil";
import Link from "next/link";
import Image from "next/image";
import { SearchProps } from "@/types";

const SearchBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearch, setRecentSearch] = useRecoilState(recentSearchState);
  const { searchTerm, setSearchTerm, changeSearchTerm, submitSearchTerm } =
    useSearch();

  const handleBlur = () => {
    setTimeout(() => {
      if (!containerRef.current.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 0);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    submitSearchTerm(e, "user");
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const deleteRecentSearch = (name: string) => {
    const searchData = JSON.parse(localStorage.getItem("search") || "[]");
    const filterData = searchData.filter(
      (item: SearchProps) => item.name !== name
    );
    setRecentSearch(filterData);
    localStorage.setItem("search", JSON.stringify(filterData));
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <form
        className=" flex items-center px-3 py-1 rounded border border-[#0000002e] bg-modeWhite dark:bg-dark_gray"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="w-full h-[35px] p-1 border-white outline-none text-17px mobile:text-sm bg-modeWhite dark:bg-dark_gray"
          placeholder="캐릭터 닉네임을 입력하세요."
          value={searchTerm}
          onChange={changeSearchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="cursor-pointer">
          <CiSearch size={25} />
        </button>
      </form>

      {isFocused && recentSearch.length > 0 && searchTerm === "" && (
        <div className="absolute w-full z-30 bg-modeWhite dark:bg-dark_gray">
          <div className="p-2 max-h-[245px] overflow-x-auto">
            <div className="pl-1 text-xs text-zinc-500">최근 검색어</div>
            {recentSearch.map((search, index) => (
              <div
                key={index}
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <div className="flex justify-between items-center">
                  <Link
                    href={`/user/${search.character_name}`}
                    className="flex items-center"
                    onClick={() => setIsFocused(false)}
                  >
                    <span className="w-35px h-35px mr-2">
                      <Image
                        src={search.character_image}
                        alt={search.character_name}
                        width={35}
                        height={35}
                        priority
                        unoptimized
                      />
                    </span>
                    <div className="flex flex-col leading-4">
                      <div className="flex items-center gap-1">
                        <Image
                          src={`/images/world/${search?.world_name}.png`}
                          alt="서버"
                          className="object-scale-down"
                          width={20}
                          height={20}
                        />
                        <span className="line-clamp-1">
                          {search.character_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <span>Lv.{search.character_level}</span>
                        <span className="line-clamp-1">
                          {search.character_class}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <button
                      className="px-3 py-1 text-sm rounded hover:bg-zinc-300 dark:hover:bg-zinc-800"
                      onClick={() => deleteRecentSearch(search.character_name)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
