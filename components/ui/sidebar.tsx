'use client'

import { useEffect, useRef, useState } from "react";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";

export function Sidebar() {
    const maxHeight = 300;
    const minHeight = 100;
    const [scrollPos, setScrollPos] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(true);
    const sidebarRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (sidebarRef.current) {
          const currentScrollPos = sidebarRef.current.scrollTop;
          const direction = currentScrollPos > scrollPos ? true : false;
            
          setScrollDirection(direction);
          setScrollPos(currentScrollPos);
        }
      };
  
      const sidebar = sidebarRef.current;
      if (sidebar) {
        sidebar.addEventListener('scroll', handleScroll);
      }
  
      return () => {
        if (sidebar) {
          sidebar.removeEventListener('scroll', handleScroll);
        }
      };
    }, [scrollPos]);

    return (
        <div ref={sidebarRef} className="flex h-full w-96 flex-none flex-col overflow-y-auto border-r">
            <div className="sticky top-0 z-10">
                <div className="w-full absolute top-0 transition-all" style={{
                    height: scrollDirection ? minHeight : maxHeight
                }}>
                    <ClickArea />
                </div>
            </div>
            <div className="relative" style={{
                paddingTop: scrollDirection ? minHeight : maxHeight
            }}>
                <Statistics />
                <Crew />
                <Shop />
            </div>
        </div>
    )
}