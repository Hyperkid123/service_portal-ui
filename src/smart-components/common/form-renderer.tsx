/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { FormRendererProps as DDFFormRendererProps } from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import useFormatMessage from '../../utilities/use-format-message';
import {
  FormTemplateProps,
  InternalModalProps
} from '../../forms/form-fields/form-template';
import { Schema } from '@data-driven-forms/react-form-renderer';

export interface FormRendererProps extends Partial<DDFFormRendererProps> {
  isModal?: boolean;
  templateProps?: Omit<FormTemplateProps, 'modalProps'>;
  schema: Schema;
  modalProps?: InternalModalProps;
  onSubmit: (...args: any[]) => any;
}

const FormRenderer: React.ComponentType<FormRendererProps> = ({
  isModal,
  templateProps = {},
  schema,
  modalProps,
  ...rest
}) => {
  const formatMessage = useFormatMessage();
  return (
    <div>
      <h1>Forms do not work with webpack 5 form some reason</h1>
    </div>
  );
};

export default memo(FormRenderer);
