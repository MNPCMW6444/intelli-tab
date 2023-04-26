import React from "react";
import { TabItem } from "./TabItem";
import { Tab } from "./TabList";

interface CategoryProps {
  category: string;
  tabs: Tab[];
}

export const Category: React.FC<CategoryProps> = ({ category, tabs }) => {
  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} />
        ))}
      </ul>
    </div>
  );
};
