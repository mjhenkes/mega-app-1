import React from 'react';
import {
  useLocation,
} from 'react-router-dom';
import applications from '../../Apps.json';

const ApplicationContext = React.createContext();

const ApplicationProvider = ({ children }) => {
  const location = useLocation();
  console.log('location in context', location);
  const applicationId = location.pathname.slice(1);
  const currentApplication = applications[applicationId] || applications.organizer;
  // const [applicationState, setApplicationState] = React.useState(currentApplication);

  const demoApplicationApplicationContextProviderValue = React.useMemo(() => ({
    current: currentApplication,
    applications,
    // updateData: (newApplication) => { setApplicationState(newApplication); },
  }), [currentApplication]);

  return (
    <ApplicationContext.Provider value={demoApplicationApplicationContextProviderValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
export { ApplicationContext };
