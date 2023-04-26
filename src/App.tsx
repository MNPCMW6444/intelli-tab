import React, { useEffect, useState } from "react";
import { Tab, getOpenTabs, categorizeTabs } from "./categorizer";
import { TabList } from "./components/TabList";

const App: React.FC = () => {
  const [categorizedTabs, setCategorizedTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchAndCategorizeTabs = async () => {
      const openTabs = await getOpenTabs();
      const categorized = await categorizeTabs(openTabs);
      setCategorizedTabs(categorized);
    };

    fetchAndCategorizeTabs();
  }, []);

  return (
    <div className="App">
      <h1>IntelliTab</h1>
      <TabList tabs={categorizedTabs} />
    </div>
  );
};

export default App;
