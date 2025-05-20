'use client';

import { Drawer } from 'vaul';

export default function VaulDrawer({placement, open, onClose, contentClass, children}: any) {
    
  return (
    <Drawer.Root direction={placement} open={open} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content 
            className={contentClass}
        >
            <Drawer.Title />
            {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
