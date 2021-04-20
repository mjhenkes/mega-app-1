import React from 'react';

import { SecondaryNavigationLayout, NavigationItem } from '@cerner/terra-application/lib/layouts';

import MyDay from '../pages/PatientList';
import PatientSearch from '../pages/PatientSearch';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import NotAPage from '../shared/NotAPage';

const NavCLayout = () => {
  const [navigationState, setNavigationState] = React.useState('my-day');

  React.useEffect(() => {
    function handleEventNavigation(event) {
      setNavigationState(event.detail);
    }

    window.addEventListener('terra-application-demo.nav-c.navigate', handleEventNavigation);

    return () => {
      window.removeEventListener('terra-application-demo.nav-c.navigate', handleEventNavigation);
    };
  });

  return (
    <SecondaryNavigationLayout
      id="organizer"
      label="Organizer"
      activeNavigationKey={navigationState}
      onSelectNavigationItem={(key) => { setNavigationState(key); }}
      renderNavigationFallback={() => <div>404</div>}
    >
      <NavigationItem
        navigationKey="my-day"
        label="My Day"
        renderPage={() => (<MyDay />)}
      />
      <NavigationItem
        navigationKey="patient-search"
        label="Patient Search"
        renderPage={() => (<PatientSearch />)}
      />
    </SecondaryNavigationLayout>
  );
};

export default NavCLayout;
