import React from 'react';
import {
  useLocation,
} from 'react-router-dom';

const ConceptContext = React.createContext();

const ConceptProvider = ({ children }) => {
  const location = useLocation();
  const patientId = location.search.slice(1);
  // const [conceptState, setConceptState] = React.useState(patientId);

  const demoApplicationConceptContextProviderValue = React.useMemo(() => ({
    data: patientId,
    // updateData: (newConcept) => { setConceptState(newConcept); },
  }), [patientId]);

  return (
    <ConceptContext.Provider value={demoApplicationConceptContextProviderValue}>
      {children}
    </ConceptContext.Provider>
  );
};

export default ConceptProvider;
export { ConceptContext };
