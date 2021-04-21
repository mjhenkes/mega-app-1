import React from 'react';

import { SecondaryNavigationLayout, NavigationItem } from '@cerner/terra-application/lib/layouts';

import { ApplicationContext } from '../providers/ApplicationProvider';

import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import NotAPage from '../shared/NotAPage';
import TemplatePage from '../pages/TemplatePage';
import MyDay from '../../organizer/pages/PatientList';
import PatientSearch from '../../organizer/pages/PatientSearch';
import ChartReview from '../../chart/pages/ChartReview';
import Handoff from '../../chart/pages/Handoff';
import ActiveOrders from '../../chart/pages/ActiveOrders';
import InactiveOrders from '../../chart/pages/InactiveOrders';
import NoteTemplates from '../../chart/pages/NoteTempates';
import InProgressNotes from '../../chart/pages/InProgressNotes';

const PageMap = {
  MyDay,
  PatientSearch,
  ChartReview,
  Handoff,
  ActiveOrders,
  InactiveOrders,
  NoteTemplates,
  InProgressNotes,
  TemplatePage,
};

const NavCLayout = () => {
  const applicationContext = React.useContext(ApplicationContext);
  const [navigationState, setNavigationState] = React.useState(applicationContext.current.pages[0].navigationKey);

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
      label={applicationContext.current.title}
      activeNavigationKey={navigationState}
      onSelectNavigationItem={(key) => { setNavigationState(key); }}
      renderNavigationFallback={() => <div>404</div>}
    >
      {applicationContext.current.pages.map(page => {
        const Page = PageMap[page.page];
        return (
          <NavigationItem
            key={page.navigationKey}
            navigationKey={page.navigationKey}
            label={page.label}
            renderPage={() => (<Page label={page.label} pageKey={page.navigationKey} />)}
          />
        );
      })}
      {/* <NavigationItem
        navigationKey="nav-C-1"
        label="Nav C-1 Page 1"
        renderPage={() => (<Page1 />)}
      />
      <NavigationItem
        navigationKey="nav-C-2"
        label="Nav C-2 Page 2"
        renderPage={() => (<Page2 />)}
      />
      <NavigationItem
        navigationKey="nav-C-3"
        label="Nav C-3 Page 3"
        renderPage={() => (<Page3 />)}
      />
      <NavigationItem
        navigationKey="nav-C-4"
        label="Nav C-4 Page 4"
        renderPage={() => <Page4 />}
      />
      <NavigationItem
        navigationKey="nav-C-5"
        label="Nav C-5 Page 5"
        renderPage={() => <Page5 />}
      />
      <NavigationItem
        navigationKey="nav-C-6"
        label="Nav C-6 Not A Page"
      >
        <NotAPage />
      </NavigationItem> */}
    </SecondaryNavigationLayout>
  );
};

export default NavCLayout;
