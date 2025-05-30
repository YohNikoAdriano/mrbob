'use client' 

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import NavItems from './NavItems'
  
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="align-middle">
          <Image
          src="/assets/icons/menu.svg"
          alt="Menu"
          width={24}
          height={24}
          className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <SheetTitle>Explore</SheetTitle>
          <Image
          src="/assets/images/logo.svg"
          alt="Connectify logo"
          height={38}
          width={128}
          />
          <Separator className="border border-gray-50" />
          <NavItems onLinkClick={() => setOpen(false)}/>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav
