import { useState } from "react";

export const useTabs = (initTabIndex, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initTabIndex);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};
