import { createContext, useState } from 'react';

export const ReportContextR = createContext({
  conclusions: [],
  updateConclusions: () => {},
  setInitialConclusions: () => {},
});

export function ReportContextProviderR({ children }) {
  const [conclusions, setConclusions] = useState([]);

  function updateConclusions({ value, title, remove }) {
    setConclusions((prevConclusions) => {
      if (remove) {
        return prevConclusions.filter(cl => cl.value !== value);
      } else {
        if (!prevConclusions.find(cl => cl.value === value)) {
          return [...prevConclusions, { value, title }];
        }
        return prevConclusions;
      }
    });
  }

  function setInitialConclusions(initialValue) {
    setConclusions(initialValue);
  }

  const value = {
    conclusions,
    updateConclusions,
    setInitialConclusions,
  };

  return (
    <ReportContextR.Provider value={value}>
      {children}
    </ReportContextR.Provider>
  );
}
