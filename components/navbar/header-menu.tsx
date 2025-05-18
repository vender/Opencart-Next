import clsx from 'clsx';
import Link from 'next/link';
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "#/components/navbar/list-menu";

export default function HeaderMenu({ menu, className }: { menu: any; className?: string }) {
	return (
		<nav className={clsx(`headerMenu flex w-full relative`, className)}>

			{menu?.map((item: any) => (
				<div
					className={`menuItem group cursor-pointer py-7 ${item.subMenu ? "relative" : ""}`}
					key={item.id}
				>
					<Link
						href={item.path}
						className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
					>
						{item.label}
						{(item?.columns || item.subMenu) && (
							<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
								<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
							</span>
						)}
					</Link>

					{item?.subMenu && Array.isArray(item.subMenu) && (
						<div className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
							<ul className="text-body text-sm py-5">
								{item.subMenu.map((menu: any, index: number) => {
									const dept: number = 1;
									const menuName: string = `sidebar-menu-${dept}-${index}`;

									return (
										<ListMenu
											dept={dept}
											data={menu}
											hasSubMenu={menu.subMenu}
											menuName={menuName}
											key={menuName}
											menuIndex={index}
										/>
									);
								})}
							</ul>
						</div>
					)}
				</div>
			))}

			<div className="flex flex-wrap flex-row items-center gap-3 ml-8">

              <a className="flex flex-wrap items-center gap-1 group" href="#">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="icon" className="w-[1rem] h-[1rem] transition-all fill-[#666666] group-hover:fill-black">
					<path d="M1.19434 10.1345C5.85934 8.12369 8.9693 6.7979 10.5243 6.15739C14.9693 4.3284 15.8918 4.01074 16.4943 4.0001C16.6268 3.99788 16.9218 4.03029 17.1143 4.18441C17.2743 4.3143 17.3193 4.48995 17.3418 4.61315C17.3618 4.73635 17.3893 5.01715 17.3668 5.23634C17.1268 7.73998 16.0843 13.8155 15.5543 16.6197C15.3318 17.8063 14.8893 18.2041 14.4618 18.2429C13.5318 18.3275 12.8268 17.6353 11.9268 17.0517C10.5193 16.1381 9.72432 15.5695 8.35682 14.6782C6.77682 13.648 7.80179 13.0817 8.70179 12.1565C8.93679 11.9143 13.0318 8.22932 13.1093 7.89509C13.1193 7.85328 13.1293 7.69742 13.0343 7.61529C12.9418 7.53291 12.8042 7.56111 12.7042 7.58337C12.5617 7.61504 10.3142 9.08655 5.95423 11.9976C5.31673 12.4316 4.73925 12.6431 4.21925 12.632C3.64925 12.6198 2.54932 12.3123 1.73182 12.0496C0.73182 11.7272 -0.0657192 11.5568 0.00428084 11.0093C0.0392808 10.7243 0.436844 10.4326 1.19434 10.1345Z" />
				</svg>
                <div className="font-medium text-[#666666] transition-all group-hover:text-black">Telegram</div>
              </a>

              <a className="flex flex-wrap items-center gap-1 group transition-all" href="#">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="icon" className="w-[1rem] h-[1rem] transition-all fill-[#666666] group-hover:fill-black">
					<path d="M13.608 2.325A7.88 7.88 0 0 0 7.998 0C3.625 0 .067 3.556.065 7.928c0 1.397.365 2.76 1.06 3.964L0 16l4.204-1.102a7.928 7.928 0 0 0 3.79.965h.004c4.37 0 7.93-3.557 7.93-7.93a7.88 7.88 0 0 0-2.32-5.608zm-5.61 12.2h-.003a6.583 6.583 0 0 1-3.355-.92l-.24-.143-2.496.654.666-2.43-.157-.25a6.573 6.573 0 0 1-1.007-3.508A6.6 6.6 0 0 1 8 1.338a6.55 6.55 0 0 1 4.66 1.934 6.55 6.55 0 0 1 1.93 4.662 6.6 6.6 0 0 1-6.592 6.59zm2.26-5.58c-.18-.068-.313-.1-.445.098s-.512.644-.627.777c-.116.132-.23.148-.43.05-.198-.1-.836-.31-1.593-.984-.59-.525-.987-1.174-1.102-1.373-.115-.198-.012-.305.087-.404.09-.09.2-.232.298-.348.1-.116.132-.198.198-.33.066-.133.033-.248-.017-.348-.05-.1-.446-1.074-.61-1.47-.162-.387-.325-.334-.447-.34a7.945 7.945 0 0 0-.38-.007.728.728 0 0 0-.53.247c-.18.2-.692.678-.692 1.653s.71 1.917.81 2.05c.098.132 1.396 2.133 3.384 2.99.473.205.842.327 1.13.418.474.15.906.13 1.248.08.38-.058 1.172-.48 1.338-.943.165-.463.165-.86.115-.942-.05-.083-.182-.133-.38-.232-.198-.1-1.172-.578-1.354-.644z"></path>
				</svg>
				<div className="font-medium text-[#666666] transition-all group-hover:text-black">WhatsApp</div>
              </a>
          	</div>

		</nav>
	)
}
