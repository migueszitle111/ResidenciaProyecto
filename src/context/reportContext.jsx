import { createContext, useState } from 'react';

export const ReportContext = createContext({
  conclusions: [],
  updateConclusions: () => {},
  setInitialConclusions: () => {},
});

export function ReportContextProvider({ children }) {
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
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
}
