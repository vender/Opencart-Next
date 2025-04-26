import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { IoClose } from "react-icons/io5";

interface Props {
	itemValue: string;
	itemKey: any;
}

export default function FilteredItem({ itemValue, itemKey }:Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams:any = useSearchParams();
	const params = new URLSearchParams(searchParams);
	let decodeQuery:any = [];
	
	function handleClose() {
		searchParams.forEach((value:any, key:any) => {
			decodeQuery[key] = value;
		});
		const currentItem = decodeQuery[itemKey].split(',').filter((i:any) => i != '' && i !== itemValue).toString();
		if(currentItem) {
			params.set(itemKey, currentItem);
		} else {
			params.delete(itemKey);
		}
		router.push(`${pathname}?${params.toString()}`);
	}
	
	return (
		<div
				className="group flex flex-shrink-0 m-1.5 items-center border border-gray-300 bg-borderBottom rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading"
				onClick={handleClose}
			>
				{`${itemValue}`}
				<IoClose className="text-sm text-body ms-2 flex-shrink-0 -me-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
			</div>
	)
}