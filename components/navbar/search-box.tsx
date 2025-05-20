"use client"
import SearchIcon from "#/components/icons/search-icon";
import React, { useState } from "react";
import Searchform from "./search-form";

export default function SearchBox() {
	const [ displaySearch, setSearch ] = useState(false) as any;

	return (
		<>
			<button
				className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
				onClick={() => setSearch(true)}
				aria-label="search-button"
				>
				<SearchIcon />
			</button>

			<Searchform displaySearch={displaySearch} setSearch={setSearch} />
		</>
	);
}