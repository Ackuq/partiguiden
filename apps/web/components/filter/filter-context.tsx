"use client";

import type React from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface ToggleValue {
  title: string;
  value: boolean;
}

export type FilterToggle<K extends string> = Record<K, ToggleValue>;

interface IFilterContext<K extends string> {
  search: string;
  toggles: FilterToggle<K>;
  activeToggles: K[];
  updateSearch: (search: string) => void;
  updateToggle: (key: K, value: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FilterContext = createContext<IFilterContext<any>>({
  search: "",
  toggles: {},
  activeToggles: [],
  updateSearch: () => void {},
  updateToggle: () => void {},
});

type FilterContextProps<K extends string> = React.PropsWithChildren<{
  initialSearch?: string;
  initialToggles: Record<K, ToggleValue>;
}>;

export function FilterContextProvider<K extends string>({
  children,
  initialSearch = "",
  initialToggles,
}: FilterContextProps<K>) {
  const [search, setSearch] = useState(initialSearch);
  const [toggles, setToggles] = useState(initialToggles);

  function updateSearch(newSearch: string) {
    setSearch(newSearch);
  }

  function updateToggle(key: K, value: boolean) {
    setToggles((prevState) => {
      const newState = { ...prevState };
      newState[key].value = value;
      return newState;
    });
  }

  const activeToggles = useMemo(() => {
    return Object.entries<ToggleValue>(toggles)
      .filter((entry) => entry[1].value)
      .map((entry) => entry[0]) as K[];
  }, [toggles]);

  return (
    <FilterContext.Provider
      value={{ search, toggles, activeToggles, updateSearch, updateToggle }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext<K extends string>(): IFilterContext<K> {
  return useContext(FilterContext as React.Context<IFilterContext<K>>);
}
