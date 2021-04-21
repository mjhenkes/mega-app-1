import React from 'react';
import PropTypes from 'prop-types';
import List, { Item } from 'terra-list/lib/index';
import Hyperlink from 'terra-hyperlink';
import IconTag from 'terra-icon/lib/icon/IconTag';
import Button from 'terra-button';
import {
  useHistory,
} from 'react-router-dom';

import Page, {
  PageActions, Action, CardLayout, Card, PageActivityOverlay,
} from '@cerner/terra-application/lib/page';

import PagePresentingModal from '../modals/PagePresentingModal';
import PendingActionsCard from './content/PendingActionsCard';
import NotificationBannersCard from './content/NotificationBannersCard';
import ErrorHandlingCard from './content/ErrorHandlingCard';
import InteractionBlockingOverlayCard from './content/InteractionBlockingOverlayCard';
import LoadingOverlayCard from './content/LoadingOverlayCard';
import NotificationDialogCard from './content/NotificationDialogCard';
import ModalManagerIntegrationCard from './content/ModalManagerIntegrationCard';
import NavigationItemCard from './content/NavigationItemCard';
import ApplicationInfoCard from './content/ApplicationInfoCard';
import InputCard from './content/InputCard';
import DynamicHeadingCard from './content/DynamicHeadingCard';

import Page2 from './Page2';

// const chartURL = 'http://localhost:8080/';
const chartURL = '/mega-app-1/#/chart';
const localChartURL = '/chart';

const propTypes = {
  label: PropTypes.string,
  pageKey: PropTypes.string,
  onRequestClose: PropTypes.func,
};

// const page1MetaData = { data: 'page-1' };

const PatientList = ({ label, pageKey, onRequestClose }) => {
  const [showPage2, setShowPage2] = React.useState(false);
  const [showPageModal, setShowPageModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [metaData, setMetaData] = React.useState({ update_timestamp: Date.now() });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetaData({ update_timestamp: Date.now() });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const history = useHistory();

  // const pageActions = (
  //   <PageActions>
  //     <Action
  //       actionKey="action-page-modal"
  //       label="Page Modal"
  //       icon={<IconTag />}
  //       onSelect={() => { setShowPageModal(true); }}
  //       isDisabled={isLoading}
  //     />
  //   </PageActions>
  // );

  const getPatients = () => {
    const patients = [];
    for (let index = 0; index < 10; index += 1) {
      patients.push((
        <Item key={index}>
          <Hyperlink
            href={`${chartURL}?${index}`}
            style={{ padding: '.5rem' }}
          >
            {`Patient ${index}`}
          </Hyperlink>
          <Hyperlink
            href={`${chartURL}?${index}`}
            style={{ padding: '.5rem' }}
            onClick={(event) => {
              event.preventDefault();
              history.push(`${localChartURL}?${index}`);
              return false;
            }}
          >
            SPA Hyperlink
          </Hyperlink>
          <Hyperlink
            href={`${chartURL}?${index}`}
            variant="external"
            target="_blank"
            style={{ padding: '.5rem' }}
          >
            New Tab
          </Hyperlink>
          <Hyperlink
            href={`${chartURL}?${index}`}
            variant="external"
            target={`Patient ${index}`}
            rel="opener"
            style={{ padding: '.5rem' }}
          >
            New Tab unique target
          </Hyperlink>
          <Hyperlink
            href={`${chartURL}?${index}`}
            variant="external"
            target="chart"
            rel="opener"
            style={{ padding: '.5rem' }}
          >
            New Tab same target
          </Hyperlink>
        </Item>
      ));
    }
    return patients;
  };

  return (
    <Page
      pageKey={pageKey}
      label={label}
      metaData={metaData}
      // actions={pageActions}
      onRequestClose={onRequestClose}
      activityOverlay={isLoading ? <PageActivityOverlay variant="loading" /> : undefined}
    >
      <CardLayout>
        <Card label="May 1st">
          <List dividerStyle="bottom-only">
            { getPatients() }
          </List>
        </Card>
        <PendingActionsCard />
      </CardLayout>
      {showPage2
        && <Page2 onRequestClose={() => { setShowPage2(false); }} />}
      {showPageModal
        && <PagePresentingModal onRequestClose={() => { setShowPageModal(false); }} />}
    </Page>
  );
};

PatientList.propTypes = propTypes;

export default PatientList;
