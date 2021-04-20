import React from 'react';

import { dismissTransientPresentations } from '@cerner/terra-application/lib/utils/transient-presentations';

import DemoApplicationNavigationLayout from './layouts/DemoApplicationNavigationLayout';
import ConceptProvider from './providers/ConceptProvider';
import SessionProvider from './providers/SessionProvider';
import ApplicationProvider from './providers/ApplicationProvider';

window.TEST_APP_TIMEOUT = 3000;

document.body.setAttribute('tabindex', -1);

document.addEventListener('terra-application-demo.dismiss-transient-content', () => {
  dismissTransientPresentations();
});

const DemoApplication = () => (
  <SessionProvider>
    <ConceptProvider>
      <ApplicationProvider>
        <DemoApplicationNavigationLayout />
      </ApplicationProvider>
    </ConceptProvider>
  </SessionProvider>
);

export default DemoApplication;
