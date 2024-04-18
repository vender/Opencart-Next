"use client"
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "next/link";
import YamapWrapper from "#/components/ui/yamap";
import { YMaps, Map, Clusterer, Placemark } from '@pbe/react-yandex-maps';


export default function ContactInfoBlock({siteInfo}:any) {
	// console.log(siteInfo);
	
	const mapImage = "/assets/images/Map.png";
	const data = [
		{
			id: 1,
			slug: "https://yandex.ru/maps/-/CDR9YFZO",
			icon: <IoLocationSharp />,
			name: "Адрес",
			description: "350001, г. Краснодар, ул. им. Вишняковой 5/2",
		},
		{
			id: 2,
			slug: "mailto:info@ilmonte.ru",
			icon: <IoMail />,
			name: "Email",
			description: "info@ilmonte.ru",
		},
		{
			id: 3,
			slug: "tel:+79184132090",
			icon: <IoCallSharp />,
			name: "Телефон",
			description: "+7(918) 413-20-90",
		},
	];

  return (
		<div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
			<h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
				Как нас найти
			</h4>

				<div className="flex pb-7">
					<div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
						<IoLocationSharp />
					</div>
					<div className="flex flex-col ps-3 2xl:ps-4">
						<h5 className="text-sm font-bold text-heading">
							Адрес
						</h5>
						<div className="text-sm mt-0">{siteInfo.siteAddress}</div>
					</div>
				</div>
				
				{siteInfo?.siteEmail && <div className="flex pb-7">
					<div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
						<IoMail />
					</div>
					<div className="flex flex-col ps-3 2xl:ps-4">
						<h5 className="text-sm font-bold text-heading">
							Email
						</h5>
						<Link href={`mailto:${siteInfo.siteEmail}`} className="text-sm mt-0">
							{siteInfo.siteEmail}
						</Link>
					</div>
				</div>}
				
				{siteInfo?.sitePhone && <div className="flex pb-7">
					<div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
						<IoCallSharp />
					</div>
					<div className="flex flex-col ps-3 2xl:ps-4">
						<h5 className="text-sm font-bold text-heading">
							Телефон
						</h5>
						<Link href={`tel:${siteInfo.sitePhone}`} className="text-sm mt-0">
							{siteInfo.sitePhone}
						</Link>
					</div>
				</div>}
				
				{siteInfo?.siteGeocode && <YMaps>
					<Map defaultState={{ center: siteInfo?.siteGeocode.split(','), zoom: 13 }} width="100%" height="300px" >
						<Clusterer
							options={{
								preset: "islands#invertedVioletClusterIcons",
								groupByCoordinates: false,
							}}
						>
							<Placemark
								modules={["geoObject.addon.balloon"]}
								geometry={siteInfo?.siteGeocode.split(',')}
								properties={{
									balloonContentHeader: `${siteInfo.siteName}`,
									balloonContentBody: `${siteInfo.siteAddress}`,
								}}
							/>
						</Clusterer>
					</Map>
				</YMaps>}

			{/* <Link href="https://yandex.ru/maps/-/CDR9YFZO" target="_blank"><img src={mapImage} alt="text-map" className="rounded-md" /></Link> */}
		</div>
  )
}