import React from "react";
import { Category } from "./Category";

export interface Tab {
  id: number;
  title: string;
  url: string;
  category: string;
}

interface TabListProps {
  tabs: Tab[];
}

export const TabList: React.FC<TabListProps> = ({ tabs }) => {
  const categories = tabs.reduce<Record<string, Tab[]>>((acc, tab) => {
    if (!acc[tab.category]) {
      acc[tab.category] = [];
    }
    acc[tab.category].push(tab);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(categories).map((category) => (
        <Category
          key={category}
          category={category}
          tabs={categories[category]}
        />
      ))}
    </div>
  );
};
