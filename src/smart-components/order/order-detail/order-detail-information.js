import React from 'react';
import PropTypes from 'prop-types';
import {
  Split,
  SplitItem,
  LevelItem,
  Level,
  Title,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { DateFormat } from '@redhat-cloud-services/frontend-components/components/cjs/DateFormat';

import CardIcon from '../../../presentational-components/shared/card-icon';
import { CATALOG_API_BASE } from '../../../utilities/constants';
import { FormattedMessage } from 'react-intl';

const OrderDetailInformation = ({
  jobName,
  state,
  orderRequestDate,
  orderUpdateDate,
  owner,
  portfolioItemId,
  sourceId
}) => (
  <Split className="pf-u-mt-sm">
    <SplitItem className="pf-u-mr-md">
      <CardIcon
        sourceId={sourceId}
        height={60}
        src={`${CATALOG_API_BASE}/portfolio_items/${portfolioItemId}/icon`}
      />
    </SplitItem>
    <SplitItem>
      <Level>
        <LevelItem className="pf-u-mr-lg">
          <Title headingLevel="h5" size="md">
            {jobName}
          </Title>
        </LevelItem>
        <LevelItem>
          <Title headingLevel="h5" size="md">
            <FormattedMessage
              id="orders.order.details.status"
              defaultMessage="Status: <icon></icon> {state}"
              values={{
                // eslint-disable-next-line react/display-name
                icon: () => (
                  <ExclamationCircleIcon className="pf-u-mr-sm icon-danger-fill" />
                ),
                state
              }}
            />
          </Title>
        </LevelItem>
      </Level>
      <Level>
        <LevelItem className="pf-u-mr-lg">
          <TextContent>
            <Text component={TextVariants.small}>
              <FormattedMessage
                id="orders.order.details.ordered"
                defaultMessage="Ordered"
              />
              &nbsp;
              <DateFormat date={orderRequestDate} type="relative" />
            </Text>
          </TextContent>
        </LevelItem>
        <LevelItem className="pf-u-mr-lg">
          <TextContent>
            <Text component={TextVariants.small}>
              <FormattedMessage
                id="orders.order.details.ordered-by"
                defaultMessage="Ordered by {owner}"
                values={{ owner }}
              />
            </Text>
          </TextContent>
        </LevelItem>
        <LevelItem>
          <TextContent>
            <Text component={TextVariants.small}>
              <FormattedMessage
                id="orders.order.details.last-updated"
                defaultMessage="Last updated"
              />
              &nbsp;
              <DateFormat date={orderUpdateDate} type="relative" />
            </Text>
          </TextContent>
        </LevelItem>
      </Level>
    </SplitItem>
  </Split>
);

OrderDetailInformation.propTypes = {
  portfolioItemId: PropTypes.string.isRequired,
  sourceId: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  orderRequestDate: PropTypes.string.isRequired,
  orderUpdateDate: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
};

export default OrderDetailInformation;
