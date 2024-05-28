"use client";

import React, { useEffect, useRef } from "react";
import { useSearch } from "@/hooks/useSearch";
import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchTerm, setSearchTerm, changeSearchTerm, submitSearchTerm } =
    useSearch();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className="w-[600px] mobile:w-full">
      <form
        className="flex items-center p-2 bg-white rounded dark:bg-dark"
        onSubmit={(e) => submitSearchTerm(e, "user")}
      >
        <input
          ref={inputRef}
          className="w-full h-[35px] p-1 border-white outline-none text-lg dark:bg-dark"
          placeholder="캐릭터 닉네임을 입력하세요."
          value={searchTerm}
          onChange={changeSearchTerm}
        />
        <button className="cursor-pointer">
          <CiSearch size={28} />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
