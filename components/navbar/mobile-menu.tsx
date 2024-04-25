"use client"
import React, { useState } from 'react'
import "rc-drawer/assets/index.css";
import MenuIcon from "#/components/icons/menu-icon";
import Drawer from 'rc-drawer';
import motionProps from '#/components/ui/motion/motion';
import MobileMenuTree from './mobile-menu-tree';

export default function Mobiledrawer({mainMenu, siteInfo}:any) {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    
    return (
        <>
            <Drawer
                open={cartIsOpen}
                placement="left"
                onClose={() => setCartIsOpen(false)}
                {...motionProps}
            >
                <div className="flex flex-col justify-between w-full h-full">
                    <MobileMenuTree cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} mainMenu={mainMenu} siteInfo={siteInfo} />
                </div>
            </Drawer>

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
