import React from 'react';

import { SecondaryNavigationLayout, NavigationItem } from '@cerner/terra-application/lib/layouts';

import ChartReview from '../pages/ChartReview';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import NotAPage from '../shared/NotAPage';

const NavCLayout = () => {
  const [navigationState, setNavigationState] = React.useState('chartReview');

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
      id="nav-c-layout"
      label="My Chart"
      activeNavigationKey={navigationState}
      onSelectNavigationItem={(key) => { setNavigationState(key); }}
      renderNavigationFallback={() => <div>404</div>}
    >
      <NavigationItem
        navigationKey="chartReview"
        label="Chart Review"
        renderPage={() => (<ChartReview />)}
      />
      <NavigationItem
        navigationKey="nav-C-2"
        label="Handoff"
        renderPage={() => (<Page2 />)}
      />
      <NavigationItem
        navigationKey="nav-C-3"
        label="Active Orders"
        renderPage={() => (<Page3 />)}
      />
      <NavigationItem
        navigationKey="nav-C-4"
        label="Inactive Orders"
        renderPage={() => <Page4 />}
      />
      <NavigationItem
        navigationKey="nav-C-5"
        label="Note Templates"
        renderPage={() => <Page5 />}
      />
      <NavigationItem
        navigationKey="nav-C-6"
        label="In Progress Notes"
      >
        <NotAPage />
      </NavigationItem>
    </SecondaryNavigationLayout>
  );
};

export default NavCLayout;
