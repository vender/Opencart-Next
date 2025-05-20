import clsx from "clsx";
import SearchIcon from "#/components/icons/search-icon";
import { FaArrowCircleRight } from "react-icons/fa";
// import { useState } from "react";

export default function Searchform({ className, displaySearch, setSearch, ...rest }:any) {

    return (
        <>
            <div
                className={clsx("overlay", {
                    open: displaySearch,
                })}
                role="button"
                onClick={() => setSearch(false)}
            />

            <div
				className={clsx(
					"drawer-search relative hidden top-0 z-30 opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px]",
					{open: displaySearch}
				)}
			>
				<div className="w-full flex flex-col justify-center">
					<div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
						<div className="flex flex-col mx-auto mb-1.5 w-full ">
                            <form
                                action={`/search`}
                                className="relative ltr:pr-12 ltr:md:pr-14 rtl:pl-12 rtl:md:pl-14 bg-white overflow-hidden rounded-md w-full"
                                noValidate
                                role="search"
                            >
                                <label htmlFor="search" className="flex items-center py-0.5">
                                    <span className="w-12 md:w-14 h-full flex flex-shrink-0 justify-center items-center cursor-pointer focus:outline-none">
                                        <SearchIcon/>
                                    </span>
                                    <input
                                        id="search"
                                        name="search"
                                        className="text-heading outline-none w-full h-12 lg:h-14 placeholder-gray-400 text-sm lg:text-base"
                                        placeholder="Поиск по товарам"
                                        aria-label="Search"
                                        autoComplete="off"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="outline-none text-2xl md:text-3xl text-gray-400 absolute top-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                                >
                                    <FaArrowCircleRight className="w-6 h-6" />
                                </button>
                            </form>
						</div>
					</div>
				</div>
			</div>
        </>
    )
}
