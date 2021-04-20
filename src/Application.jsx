import React from 'react';
import ApplicationBase from '@cerner/terra-application';
import ApplicationContainer from '@cerner/terra-application/lib/application-container/ApplicationContainer';
import {
  useLocation, Redirect,
} from 'react-router-dom';

import DemoApplication from './demo-application/DemoApplication';
import { ApplicationContext } from './demo-application/providers/ApplicationProvider';

const Application = () => {
  const location = useLocation();
  const applicationContext = React.useContext(ApplicationContext);

  console.log('location:', location);

  return (
    <ApplicationBase>
      <ApplicationContainer applicationName={applicationContext.current.title} applicationVersion={applicationContext.current.version}>
        <DemoApplication />
      </ApplicationContainer>
    </ApplicationBase>
  );
};

export default Application;
