"use client"
import SearchIcon from "#/components/icons/search-icon";
import React, { useState } from "react";
import Searchform from "./search-form";

export default function SearchBox() {
	const [ displaySearch, setSearch ] = useState(false) as any;

	const openSearch = () => {
		setSearch(true)
	}

	return (
		<>
			<button
				className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
				onClick={openSearch}
				aria-label="search-button"
				>
				<SearchIcon />
			</button>

			<Searchform displaySearch={displaySearch} setSearch={setSearch} />
		</>
	);
}