'use client';

import { Drawer, DrawerItems } from 'flowbite-react';
import dynamic from 'next/dynamic';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AppDrawer: React.FC<Props> = React.memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} position="right" className="md:w-2xl w-[340px] px-0 py-0  z-50 " backdrop={true}>
      <DrawerItems className="p-0">{/* <ContactUs /> */}</DrawerItems>
    </Drawer>
  );
});

export default AppDrawer;
