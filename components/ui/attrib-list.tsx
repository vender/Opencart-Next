import parse from "html-react-parser";

export default function Attriblist({ content }: any) {
  return (
    content.map((item: any) => {
      const visibleAttributes = item?.attribute?.filter((attrib: any) => attrib?.display != 0);

      if (!visibleAttributes || visibleAttributes.length === 0) {
        return null; // Не отображать группу, если нет видимых атрибутов
      }

      return (
        <div className="mb-3" key={item.attribute_group_id}>
          <div className="font-bold">{item.name}</div>
          <div className="">
            {visibleAttributes.map((attrib: any) => (
              <dl key={attrib.attribute_id} className="flex">
                <dt className="w-1/2 relative before:content-[''] before:absolute before:w-full before:border-dotted before:border before:border-[#ccd6e499] before:bottom-2">
                  <span className="pr-1 bg-white inline relative text-[#001a3499]">
                    {attrib.name}
                  </span>
                </dt>
                <dd className="w-1/2 font-medium whitespace-pre-wrap">{parse(attrib.text)}</dd>
              </dl>
            ))}
          </div>
        </div>
      );
    })
  );
}
