"use client"
import Text from "#/components/ui/text";
import FilterIcon from "#/components/icons/filter-icon";
import { useState } from "react";
import ShopFilters from "#/components/ui/filters";
import VaulDrawer from "#/components/layout/Drawer";

export default function SearchTopBar({category, attribute_groups, attribs, minPrice, maxPrice}:any) {
	const [openFilter, setDisplayFilter] = useState(false);

	return (
		<div className="flex justify-between items-center mb-7">
				<Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
					{category.name}
				</Text>
				<button
					className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
					onClick={() => setDisplayFilter(true) }
				>
					<FilterIcon />
					<span className="ps-2.5">Фильтр</span>
				</button>

				<VaulDrawer
					placement="left"
					open={openFilter}
					onClose={() => setDisplayFilter(false)}
					contentClass="left-0 top-0 bottom-0 fixed z-[100] h-full w-[370px] outline-none bg-white"
				>
					<ShopFilters
						attribute_groups={attribute_groups}
						attribs={attribs}
						minPrice={minPrice}
						maxPrice={maxPrice}
						mobile={true}
						onClose={() => setDisplayFilter(false)}
					/>
				</VaulDrawer>
		</div>
	)
}