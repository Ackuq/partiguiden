"use client";

import { mainNavigation } from "@lib/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import TabEntry from "./tab-entry";

const SCROLL_STEP = 300;
const leftDivId = "navbar-left-boundary";
const rightDivId = "navbar-right-boundary";

export default function TabNavigation() {
  const leftDivRef = useRef<HTMLDivElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleScrollRight = useCallback<
    React.MouseEventHandler<HTMLElement>
  >(() => {
    navRef.current?.scrollBy({ left: SCROLL_STEP });
  }, []);

  const handleScrollLeft = useCallback<
    React.MouseEventHandler<HTMLElement>
  >(() => {
    navRef.current?.scrollBy({ left: -SCROLL_STEP });
  }, []);

  useEffect(() => {
    if (!leftDivRef.current || !rightDivRef.current) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === rightDivId) {
          if (entry.isIntersecting) {
            setShowRightButton(false);
            return;
          }
          setShowRightButton(true);
        }
        if (entry.target.id === leftDivId) {
          if (entry.isIntersecting) {
            setShowLeftButton(false);
            return;
          }
          setShowLeftButton(true);
        }
      });
    });
    observer.observe(leftDivRef.current);
    observer.observe(rightDivRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hidden items-end sm:flex">
      {showLeftButton ? (
        <button className="h-14 w-20" onClick={handleScrollLeft}>
          <ArrowLeftIcon className="m-auto h-6 w-6" />
        </button>
      ) : (
        <div className="h-14 w-20" />
      )}
      <nav
        className="scrollbar-hide flex gap-3 overflow-x-scroll scroll-smooth text-center"
        ref={navRef}
      >
        <div id={leftDivId} ref={leftDivRef} />
        {mainNavigation.map((item) => (
          <TabEntry key={item.title} item={item} navRef={navRef} />
        ))}
        <div id={rightDivId} className="min-w-[1px]" ref={rightDivRef} />
      </nav>
      {showRightButton ? (
        <button className="h-14 w-20" onClick={handleScrollRight}>
          <ArrowRightIcon className="m-auto h-6 w-6" />
        </button>
      ) : (
        <div className="h-14 w-20" />
      )}
    </div>
  );
}
