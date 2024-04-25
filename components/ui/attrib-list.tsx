
export default function Attriblist({content}:any) {
    
    return (
        content.map((item:any) => {
            return (
            <div className="mb-3" key={item.attribute_group_id}>
                <div className="font-bold">{item.name}</div>
                <div className="">
                    {item.attribute && item.attribute.map((attrib:any) => {
                        return attrib?.status != 0 && (
                            <dl key={attrib.attribute_id} className="flex">
                                <dt className="w-1/2 relative before:content-[''] before:absolute before:w-full before:border-dotted before:border before:border-[#ccd6e499] before:bottom-2">
                                    <span className="pr-1 bg-white inline relative text-[#001a3499]">
                                        {attrib.name}
                                    </span>
                                </dt>
                                <dd className="w-1/2 font-medium">{attrib.text}</dd>
                            </dl>
                        )
                    })}
                </div>
            </div>
        )})
    );
}
