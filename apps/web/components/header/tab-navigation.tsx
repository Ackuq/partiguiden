"use client";

import { mainNavigation } from "@lib/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import TabEntry from "./tab-entry";

const SCROLL_STEP = 300;

export default function TabNavigation() {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const onScroll = useCallback<React.UIEventHandler<HTMLElement>>((event) => {
    if (event.currentTarget.scrollLeft > 0) {
      setShowLeftButton(true);
    } else if (event.currentTarget.scrollLeft <= 0) {
      setShowLeftButton(false);
    }

    if (
      event.currentTarget.scrollWidth - event.currentTarget.scrollLeft <=
      event.currentTarget.clientWidth
    ) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  }, []);

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

  useLayoutEffect(() => {
    function resizeHandler() {
      if (navRef.current?.clientWidth === navRef.current?.scrollWidth) {
        setShowRightButton(false);
      } else if (
        navRef.current &&
        navRef.current?.clientWidth < navRef.current?.scrollWidth
      ) {
        setShowRightButton(true);
      }
    }

    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
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
        onScroll={onScroll}
      >
        {mainNavigation.map((item) => (
          <TabEntry key={item.title} item={item} navRef={navRef} />
        ))}
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
