"use client"
import FilteredItem from "#/components/ui/filtered-item";
import { IoClose } from "react-icons/io5";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import AttribFilter from "./attrib-filter";
import { PriceFilter } from "#/components/price-filter"

export default function ShopFilters({ attribute_groups, attribs, minPrice, maxPrice, onClose, mobile = false }: any) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams: any = useSearchParams();
	let allParams: any = [];
	
	searchParams.forEach((value: any, key: any) => {
		value.split(',').filter((e: any) => e).map((i: any) => {
			allParams.push([i, key]);
		})
	});

	// Функция обработки изменения цены
	const handlePriceChange = async (minPrice: number, maxPrice: number) => {
		const params = new URLSearchParams(searchParams);
		if (minPrice && maxPrice) {
			params.set('price', `${minPrice}-${maxPrice}`);
		} else {
			params.delete('price');
		}
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className={`${mobile ? 'p-4' : 'pt-1'}`}>
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						Фильтр
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="очистить"
						onClick={() => {
							router.push(pathname);
						}}
					>
						очистить
					</button>
					{mobile && <button
                        className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 focus:outline-none transition-opacity hover:opacity-60"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <IoClose className="text-black mt-1 md:mt-0.5" />
                    </button>}
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					
				<PriceFilter
					minPrice={minPrice}
					maxPrice={maxPrice}
					onPriceChange={handlePriceChange}
				/>

					{allParams.length > 0 &&
						allParams.map((v: any, idx: any) =>
						(
							<FilteredItem
								itemKey={v[1]}
								itemValue={v[0]}
								key={idx}
							/>
						)
						)}
				</div>
			</div>

			<AttribFilter attribute_groups={attribute_groups} items={attribs} />
		</div>
	)
}