import React from 'react';
import {
  Modal,
  ModalBoxHeader,
  ModalBoxBody,
  ModalBoxCloseButton
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

const ModalWrapper = ({ title, isOpen, onClose, children, bodyProps, modalProps }) => (
  <Modal
    isOpen={ isOpen }
    title={ title }
    onClose={ onClose }
    { ...modalProps }
  >
    <ModalBoxHeader>
      <ModalBoxCloseButton onClose={ onClose }/>
    </ModalBoxHeader>
    <ModalBoxBody { ...bodyProps }>
      { children }
    </ModalBoxBody>
  </Modal>
);

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  title: PropTypes.string,
  bodyProps: PropTypes.object,
  modalProps: PropTypes.object
};

export default ModalWrapper;
