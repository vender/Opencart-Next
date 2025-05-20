"use client"
import React, { useState } from 'react'
import "rc-drawer/assets/index.css";
import MenuIcon from "#/components/icons/menu-icon";
import Drawer from 'rc-drawer';
import VaulDrawer from "#/components/layout/Drawer";
import motionProps from '#/components/ui/motion/motion';
import MobileMenuTree from './mobile-menu-tree';

export default function Mobiledrawer({mainMenu, siteInfo}:any) {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    
    return (
        <>
            <VaulDrawer
					placement="left"
					open={cartIsOpen}
					onClose={() => setCartIsOpen(false)}
					contentClass="left-0 top-0 bottom-0 fixed z-[100] h-full w-[370px] outline-none bg-white"
				>
                <div className="flex flex-col justify-between w-full h-full">
                    <MobileMenuTree cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} mainMenu={mainMenu} siteInfo={siteInfo} />
                </div>
            </VaulDrawer>

            <button
                aria-label="Меню"
                className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
                onClick={() => setCartIsOpen(true)}
                >
                <MenuIcon />
            </button>
        </>
    )
}
