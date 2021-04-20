import React from 'react';
import PropTypes from 'prop-types';
import List, { Item } from 'terra-list';
import Hyperlink from 'terra-hyperlink';
import ApplicationModal from '@cerner/terra-application/lib/application-modal/ApplicationModal';
import {
  useHistory,
} from 'react-router-dom';
import { ApplicationContext } from '../providers/ApplicationProvider';

const propTypes = {
  /**
   * Function called to request closing the modal
   */
  onRequestClose: PropTypes.func.isRequired,
};

const ApplicationSwitcherModal = ({ onRequestClose }) => {
  const applicationContext = React.useContext(ApplicationContext);
  const history = useHistory();
  const hrefPrefix = '/mega-app-1/#/';
  return (
    <ApplicationModal
      title="Application Switcher"
      onRequestClose={onRequestClose}
    >
      <List dividerStyle="bottom-only" paddingStyle="standard">
        {Object.values(applicationContext.applications).filter(app => applicationContext.current.id !== app.id).map(app => (
          <Item key={app.id}>
            <Hyperlink
              href={`${hrefPrefix}${app.route}`}
              style={{ padding: '.5rem' }}
            >
              {app.title}
            </Hyperlink>
            <Hyperlink
              href={`${hrefPrefix}${app.route}`}
              style={{ padding: '.5rem' }}
              onClick={(event) => {
                event.preventDefault();
                onRequestClose();
                history.push(`/${app.route}`);
                return false;
              }}
            >
              SPA Hyperlink
            </Hyperlink>
            <Hyperlink
              href={`${hrefPrefix}${app.route}`}
              variant="external"
              target="_blank"
              style={{ padding: '.5rem' }}
            >
              New Tab
            </Hyperlink>
            <Hyperlink
              href={`${hrefPrefix}${app.route}`}
              variant="external"
              target="chart"
              rel="opener"
              style={{ padding: '.5rem' }}
            >
              New Tab same target
            </Hyperlink>
          </Item>
        ))}
      </List>
    </ApplicationModal>
  );
};

ApplicationSwitcherModal.propTypes = propTypes;

export default ApplicationSwitcherModal;
