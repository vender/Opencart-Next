import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "#/components/ui/logo";
import {IoClose} from "react-icons/io5";
import Link from "next/link";


export default function MobileMenuTree({setCartIsOpen, mainMenu, siteInfo}:any) {
	const [activeMenus, setActiveMenus] = useState<any>([]);
	
	const handleArrowClick = (menuName: string) => {
		let newActiveMenus = [...activeMenus];

		if (newActiveMenus.includes(menuName)) {
			var index = newActiveMenus.indexOf(menuName);
			if (index > -1) {
				newActiveMenus.splice(index, 1);
			}
		} else {
			newActiveMenus.push(menuName);
		}

		setActiveMenus(newActiveMenus);
	};

	const ListMenu = ({
		dept,
		data,
		hasSubMenu,
		menuName,
		menuIndex,
		className = "",
	}: any) =>
		data.label && (
			<li className={`mb-0.5 ${className}`}>
				<div className="flex items-center justify-between">
					<Link
						href={`${data.path}`}
						className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
					>
						<span className="block w-full" onClick={() => setCartIsOpen(false)}>
							{data.label}
						</span>
					</Link>
					{hasSubMenu && (
						<div
							className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
							onClick={() => handleArrowClick(menuName)}
						>
							<IoIosArrowDown
								className={`transition duration-200 ease-in-out transform text-heading ${
									activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
								}`}
							/>
						</div>
					)}
				</div>
				{hasSubMenu && (
					<SubMenu
						dept={dept}
						data={data.subMenu}
						toggle={activeMenus.includes(menuName)}
						menuIndex={menuIndex}
					/>
				)}
			</li>
		);

	const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
		if (!toggle) {
			return null;
		}

		dept = dept + 1;

		return (
			<ul className="pt-0.5">
				{data?.map((menu: any, index: number) => {
					const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

					return (
						<ListMenu
							dept={dept}
							data={menu}
							hasSubMenu={menu.subMenu}
							menuName={menuName}
							key={menuName}
							menuIndex={index}
							className={dept > 1 && "ps-4"}
						/>
					);
				})}
			</ul>
		);
	};

	return (
		<>
			<div className="flex flex-col w-full h-full">
				<div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
					<Logo className='inline-flex focus:outline-none' siteInfo={siteInfo} width={100} height={50} />

					<button
						className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
						onClick={() => setCartIsOpen(false)}
						aria-label="close"
					>
						<IoClose className="text-black mt-1 md:mt-0.5" />
					</button>
				</div>

				<div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
					<ul className="mobileMenu">
						{mainMenu.menu.map((menu:any, index:any) => {
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

			</div>
		</>
	);
}
