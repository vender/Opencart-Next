import React, { useEffect, useMemo, useState } from "react";
import { useCollapse } from 'react-collapsed';
import CheckBox from "#/components/ui/checkbox";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterCollapse({ attrib_group, items }: any) {
  // filter & sort as before
  items = items
    .filter((item: any) => item.attribute_id === attrib_group[0])
    .sort((a: any, b: any) => a.text.localeCompare(b.text));

  // collapse hook
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });

  // next/router hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // **1) wrap params creation in useMemo** so it only changes when `searchParams` changes
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  // **2) compute selectedAttribs off of that memoized params**
  const selectedAttribs = useMemo(() => {
    const all = params.getAll(attrib_group[1]);
    return all.length ? all.toString().split(",") : [];
  }, [attrib_group, params]);

  // local form state
  const [formState, setFormState] = useState<string[]>(selectedAttribs);

  // **3) make the effect depend on `selectedAttribs`, not on searchParams**
  useEffect(() => {
    setFormState(selectedAttribs);
  }, [selectedAttribs]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const next =
      formState.includes(value)
        ? formState.filter((i) => i !== value)
        : [...formState, value];

    if (next.length) {
      params.set(attrib_group[1], next.toString());
    } else {
      params.delete(attrib_group[1]);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    items.length > 0 &&
    !!items[0].text && (
      <>
        <h3
          className="text-heading text-sm md:text-base font-semibold"
          {...getToggleProps()}
        >
          {isExpanded ? `${attrib_group[1]} +` : `${attrib_group[1]} -`}
        </h3>
        <section className="mt-2 flex flex-col space-y-2" {...getCollapseProps()}>
          {items.map((item: any, idx: number) =>
            item.text ? (
              <CheckBox
                key={item.attribute_id + idx}
                name={item.text}
                checked={formState.includes(item.text)}
                value={item.text}
                onChange={handleItemClick}
              />
            ) : null
          )}
        </section>
      </>
    )
  );
}
