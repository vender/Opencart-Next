import React, { useEffect, useMemo, useState } from "react";
import { useCollapse } from 'react-collapsed'
import CheckBox from "#/components/ui/checkbox";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export default function FilterCollapse({ attrib_group, items }: any) {
	items = items.filter((item: any, idx: number) => item.attribute_id == attrib_group[0]);
	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: false });
	items.sort((a:any, b:any) => {
		return a.text - b.text;
	});

	const router = useRouter();
	const pathname = usePathname();
	const searchParams:any = useSearchParams();
	const params = new URLSearchParams(searchParams);
	// const selectedAttribs = params?.getAll(attrib_group[1]).length ? params?.getAll(attrib_group[1]).toString().split(",") : [];
	const selectedAttribs = useMemo(
		() => params?.getAll(attrib_group[1]).length ? params?.getAll(attrib_group[1]).toString().split(",") : [],
		[attrib_group, params]
	  );
	const [formState, setFormState] = useState<string[]>(selectedAttribs);

	useEffect(() => {
		setFormState(selectedAttribs);
	}, [searchParams]);
	
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;

		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];

		if (currentFormState.length) {
			params.set(attrib_group[1], currentFormState.toString());
		} else {
			params.delete(attrib_group[1]);
		}
		
		router.push(`${pathname}?${params.toString()}`);
	}

	return (
		items.length > 0 && items[0].text && <>
			<h3 className="text-heading text-sm md:text-base font-semibold" {...getToggleProps()}>
				{isExpanded ? `${attrib_group[1]} -` : `${attrib_group[1]} +`}
			</h3>
			<section className="mt-2 flex flex-col space-y-2" {...getCollapseProps()}>
				{items.map((item: any, idx:number) => (
					item.text && <CheckBox
						key={item.attribute_id+idx}
						name={item.text}
						checked={formState.includes(item.text)}
						value={item.text}
						onChange={handleItemClick}
					/>
				)
				)}
			</section>
		</>
	)
}