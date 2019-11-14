import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ActionGroup, Button } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';

import { cancelOrder } from '../../../redux/actions/order-actions';
import CancelOrderModal from '../cancel-order-modal';

const CANCELABLE_STATES = [ 'Approval Pending' ];

const canCancel = state => CANCELABLE_STATES.includes(state);

const OrderToolbarActions = ({ state, orderId }) => {
  const dispatch = useDispatch();
  const [ cancelModalOpen, setCancelModalOpen ] = useState(false);
  return (
    <Fragment>
      <CancelOrderModal
        onClose={ () => setCancelModalOpen(false) }
        isOpen={ cancelModalOpen }
        cancelOrder={ () => dispatch(cancelOrder(orderId)) }
      />
      <ActionGroup>
        <Button
          onClick={ () => setCancelModalOpen(true) }
          isDisabled={ !canCancel(state) }
          type="button"
          className="pf-u-mr-md">
            Cancel order
        </Button>
        <Button isDisabled type="button">
          Reorder
        </Button>
      </ActionGroup>

    </Fragment>
  );};

OrderToolbarActions.propTypes = {
  state: PropTypes.string,
  orderId: PropTypes.string.isRequired
};

export default OrderToolbarActions;
