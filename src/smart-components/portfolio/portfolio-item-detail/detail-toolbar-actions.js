import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  LevelItem
} from '@patternfly/react-core';
import ButtonWithSpinner from '../../../presentational-components/shared/button-with-spinner';
import CatalogLink from '../../common/catalog-link';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  edit: {
    id: 'portfolio.item.detail.actions.edit',
    defaultMessage: 'Edit'
  },
  copy: {
    id: 'portfolio.item.detail.actions.copy',
    defaultMessage: 'Copy'
  },
  approval: {
    id: 'portfolio.item.detail.actions.approval',
    defaultMessage: 'Set approval'
  },
  survey: {
    id: 'portfolio.item.detail.actions.survey',
    defaultMessage: 'Edit survey'
  },
  order: {
    id: 'portfolio.item.detail.actions.order',
    defaultMessage: 'Order'
  }
});

const DetailToolbarActions = ({
  copyUrl,
  orderUrl,
  editUrl,
  workflowUrl,
  editSurveyUrl,
  isOpen,
  setOpen,
  isFetching,
  availability,
  userCapabilities: { update, copy, set_approval }
}) => {
  const { formatMessage } = useIntl();
  const dropdownItems = [];
  if (update) {
    dropdownItems.push(
      <DropdownItem
        aria-label="Edit Portfolio"
        key="edit-portfolio-item"
        id="edit-portfolio-item"
        component={
          <CatalogLink pathname={editUrl} preserveSearch>
            {formatMessage(messages.edit)}
          </CatalogLink>
        }
        role="link"
      />
    );
  }

  if (copy) {
    dropdownItems.push(
      <DropdownItem
        aria-label="Copy Portfolio"
        key="copy-portfolio-item"
        id="copy-portfolio-item"
        component={
          <CatalogLink pathname={copyUrl} preserveSearch>
            {formatMessage(messages.copy)}
          </CatalogLink>
        }
        role="link"
      />
    );
  }

  if (set_approval) {
    dropdownItems.push(
      <DropdownItem
        aria-label="Set approval"
        key="set-approval_workflow"
        id="set-approval_workflow"
        component={
          <CatalogLink pathname={workflowUrl} preserveSearch>
            {formatMessage(messages.approval)}
          </CatalogLink>
        }
        role="link"
      />
    );
  }

  if (update) {
    dropdownItems.push(
      <DropdownItem
        aria-label="Edit survey"
        key="edit-survey"
        id="edit-survey"
        component={
          <CatalogLink pathname={editSurveyUrl} preserveSearch>
            {formatMessage(messages.survey)}
          </CatalogLink>
        }
        role="link"
      />
    );
  }

  return (
    <Fragment>
      <LevelItem>
        <CatalogLink
          isDisabled={isFetching || availability === 'unavailable'}
          pathname={orderUrl}
          preserveSearch
        >
          <ButtonWithSpinner
            isDisabled={isFetching || availability === 'unavailable'}
            showSpinner={isFetching}
            variant="primary"
            id="order-portfolio-item"
          >
            {formatMessage(messages.order)}
          </ButtonWithSpinner>
        </CatalogLink>
      </LevelItem>
      <LevelItem style={{ marginLeft: 16 }}>
        {dropdownItems.length > 0 && (
          <Dropdown
            isPlain
            onToggle={setOpen}
            onSelect={() => setOpen(false)}
            position={DropdownPosition.right}
            toggle={
              <KebabToggle
                id="portfolio-item-actions-toggle"
                onToggle={(isOpen) => setOpen(isOpen)}
              />
            }
            isOpen={isOpen}
            dropdownItems={dropdownItems}
          />
        )}
      </LevelItem>
    </Fragment>
  );
};

DetailToolbarActions.propTypes = {
  orderUrl: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  copyUrl: PropTypes.string.isRequired,
  editSurveyUrl: PropTypes.string.isRequired,
  workflowUrl: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  availability: PropTypes.oneOf(['available', 'unavailable']).isRequired,
  userCapabilities: PropTypes.shape({
    update: PropTypes.bool,
    copy: PropTypes.bool,
    set_approval: PropTypes.bool
  }).isRequired
};

DetailToolbarActions.defaultProps = {
  isFetching: false
};

export default DetailToolbarActions;
