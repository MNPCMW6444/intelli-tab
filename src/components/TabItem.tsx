import React from "react";
import { Tab } from "./TabList";

interface TabItemProps {
  tab: Tab;
}

export const TabItem: React.FC<TabItemProps> = ({ tab }) => {
  return (
    <li>
      <a href={tab.url} target="_blank" rel="noopener noreferrer">
        {tab.title}
      </a>
    </li>
  );
};
