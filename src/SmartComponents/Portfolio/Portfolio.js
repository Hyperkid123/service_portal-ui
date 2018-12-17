import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Dropdown,
  DropdownPosition,
  DropdownItem,
  KebabToggle,
  Title,
  Button
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import flexStyles from '@patternfly/patternfly-next/utilities/Flex/flex.css';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import { fetchSelectedPortfolio, fetchPortfolioItemsWithPortfolio, updatePortfolio } from '../../redux/Actions/PortfolioActions';
import ModalWrapper from '../../PresentationalComponents/Shared/ModalWrapper';
import FormRenderer from '../Common/FormRenderer';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { editPortfolioSchema } from '../../forms/schemas/portfolios';

import './portfolio.scss';
class Portfolio extends Component {
  state = {
    portfolioId: '',
    isKebabOpen: false,
    isOpen: false
  };

  fetchData = apiProps => {
    this.props.fetchSelectedPortfolio(apiProps);
    this.props.fetchPortfolioItemsWithPortfolio(apiProps);
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(this.props.match.params.id);
    }
  }

  onKebabToggle = isOpen => this.setState({ isKebabOpen: isOpen });

  toggleModal = isOpen => this.setState({ isOpen });

  onSubmit = data => {
    this.props.updatePortfolio(data).then(() => {
      this.toggleModal(false);
      return this.props.fetchPortfolios();
    });
  }

  onCancel = () => {
    this.props.addNotification({
      variant: 'warning',
      title: 'Editing portfolio',
      description: 'Edit portfolio was cancelled by the user.'
    });
    this.toggleModal(false);
  }

  buildPortfolioActionKebab = () => (
    <Dropdown
      onToggle= { this.onKebabToggle }
      onSelect= { this.onKebabSelect }
      position = { DropdownPosition.right }
      toggle={ <KebabToggle onToggle={ this.onKebabToggle } /> }
      isOpen={ this.state.isKebabOpen }
      isPlain
    >
      <DropdownItem component="button">Add Products</DropdownItem>
      <DropdownItem component="button">Remove Products</DropdownItem>
    </Dropdown>
  );

  portfolioActionsToolbar() {
    return (
      <Toolbar className={ css(flexStyles.justifyContentSpaceBetween, spacingStyles.mxXl, spacingStyles.myMd) }>
        <ToolbarGroup>
          <ToolbarItem className={ css(spacingStyles.mrXl) }>
            { this.props.portfolio && <Title size={ '2xl' }> { this.props.portfolio.name }</Title> }
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup  className={ 'pf-u-ml-auto-on-xl' }>
          <ToolbarItem className={ css(spacingStyles.mxLg) }>
            <Button variant="plain" onClick={ () => this.toggleModal(true) } aria-label="Edit Portfolio">
              Edit Portfolio
            </Button>
          </ToolbarItem>
          <ToolbarItem className={ css(spacingStyles.mxLg) }>
            <Button variant="plain" aria-label="Remove Portfolio">
              Remove Portfolio
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            { this.buildPortfolioActionKebab() }
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    let filteredItems = {
      items: this.props.portfolioItems.portfolioItems,
      isLoading: this.props.isLoading
    };
    return (
      <Fragment>
        <div className="action-toolbar">
          { this.portfolioActionsToolbar() }
        </div>
        <ContentGallery { ...filteredItems } />
        <ModalWrapper
          title="Edit Portfolio"
          isOpen={ this.state.isOpen }
          onClose={ this.onCancel }
        >
          <FormRenderer
            schema={ editPortfolioSchema }
            onSubmit={ this.onSubmit }
            onCancel={ this.onCancel }
            schemaType="mozilla"
          />
        </ModalWrapper>
      </Fragment>
    );
  }
}

function mapStateToProps({ portfolioReducer: { selectedPortfolio, portfolioItems, isLoading }}) {
  return {
    portfolio: selectedPortfolio,
    portfolioItems,
    isLoading
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPortfolioItemsWithPortfolio,
  fetchSelectedPortfolio,
  addNotification,
  updatePortfolio
}, dispatch);

Portfolio.propTypes = {
  isLoading: propTypes.bool,
  fetchPortfolioItemsWithPortfolio: propTypes.func,
  fetchSelectedPortfolio: propTypes.func,
  showModal: propTypes.func,
  hideModal: propTypes.func,
  history: propTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));
