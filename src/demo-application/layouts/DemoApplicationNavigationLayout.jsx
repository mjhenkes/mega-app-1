import React from 'react';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import IconTile from 'terra-icon/lib/icon/IconTile';
import Button from 'terra-button';
import DemographicsBanner from 'terra-demographics-banner';

import ApplicationModal from '@cerner/terra-application/lib/application-modal/ApplicationModal';
import PrimaryNavigationLayout, { NavigationItem } from '@cerner/terra-application/lib/primary-navigation-layout';
import ApplicationConceptProvider from '@cerner/terra-application/lib/application-container/ApplicationConceptProvider';
import ModalManager from '@cerner/terra-application/lib/modal-manager';
import classNamesBind from 'classnames/bind';
import { ConceptContext } from '../providers/ConceptProvider';
import { ApplicationContext } from '../providers/ApplicationProvider';
import ApplicationSwitcherModal from '../modals/_ApplicataionSwitcherModal';


import OrganizerLayout from '../../organizer/layouts/OrganizerLayout';
import ChartLayout from '../../chart/layouts/ChartLayout';

import ConceptBanner from '../shared/ConceptBanner';
import NotAPage from '../shared/NotAPage';

import styles from './DemoApplicationNavigationLayout.module.scss';

const LayoutMap = {
  organizer: <OrganizerLayout />,
  chart: <ChartLayout />,
};

const cx = classNamesBind.bind(styles);

const DemoApplicationNavigationLayout = () => {
  const conceptContext = React.useContext(ConceptContext);
  const applicationContext = React.useContext(ApplicationContext);

  console.log(applicationContext);

  const [navigationState, setNavigationState] = React.useState('nav-A');
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [showAppSwitcherModal, setShowAppSwitcherModal] = React.useState(false);

  const render = () => {
    if (applicationContext.current.requiresPatientContext && !conceptContext.data) {
      return { children: <div> Choose a patient </div> };
    }
    return { renderLayout: () => LayoutMap[applicationContext.current.id] };
  };

  if (conceptContext.data) {
    document.title = `${applicationContext.current.title}: ${conceptContext.data}`;
  } else {
    document.title = applicationContext.current.title;
  }

  return (
    <>
      <ApplicationConceptProvider
        conceptDescription={`Concept ${conceptContext.data}`}
        layoutBanner={conceptContext.data ? (
          <div
            style={{ padding: '.4rem', backgroundColor: '#014979' }}
          >
            <DemographicsBanner
              className={cx('rounded')}
              age="25 Years"
              dateOfBirth="May 9, 1993"
              gender="Male"
              personName={`Patient ${conceptContext.data}`}
            />
          </div>

        ) : undefined}
        modalBanner={conceptContext.data ? (
          <DemographicsBanner
            age="25 Years"
            dateOfBirth="May 9, 1993"
            gender="Male"
            personName={`Patient ${conceptContext.data}`}
          />
        ) : undefined}
      >
        <ModalManager>
          <PrimaryNavigationLayout
            id="demo-application"
            extensionItems={[{
              key: 'search',
              icon: <IconSearch />,
              text: 'Search',
            }, {
              key: 'appSwitch',
              icon: <IconTile />,
              text: 'Application Switcher',
            }]}
            onSelectExtensionItem={(itemKey) => {
              if (itemKey === 'search') {
                setShowSearchModal(true);
              }
              if (itemKey === 'appSwitch') {
                setShowAppSwitcherModal(true);
              }
            }}
            utilityItems={[{
              key: 'custom-utility-item',
              text: 'Custom Utility Item',
            }]}
            onSelectUtilityItem={(key) => {
              if (key === 'custom-utility-item') {
                console.log('Custom Utility Item selected');
              }
            }}
            onSelectHelp={() => {}}
            // activeNavigationKey={conceptContext.data ? navigationState : undefined}
            // onSelectNavigationItem={(key) => { setNavigationState(key); }}
            renderNavigationFallback={() => <div>404</div>}
            {...render()}

          />
        </ModalManager>
        {showDetailsModal && (
          <ApplicationModal title="Concept Details" size="small" onRequestClose={() => { setShowDetailsModal(false); }}>
            <div style={{ padding: '1rem' }}>
              <p>Details go here.</p>
            </div>
          </ApplicationModal>
        )}
      </ApplicationConceptProvider>
      {showSearchModal && (
        <ApplicationModal title="Search" size="large" onRequestClose={() => { setShowSearchModal(false); }}>
          <div style={{ padding: '1rem' }}>
            <Button text="1" onClick={() => { conceptContext.updateData('1'); setShowSearchModal(false); }} />
            <Button text="2" onClick={() => { conceptContext.updateData('2'); setShowSearchModal(false); }} />
            <Button text="3" onClick={() => { conceptContext.updateData('3'); setShowSearchModal(false); }} />
          </div>
        </ApplicationModal>
      )}
      {showAppSwitcherModal && (
        <ApplicationSwitcherModal onRequestClose={() => { setShowAppSwitcherModal(false); }} />
      )}
    </>
  );
};

export default DemoApplicationNavigationLayout;
