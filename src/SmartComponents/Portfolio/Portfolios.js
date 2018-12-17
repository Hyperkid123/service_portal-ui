import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarItem, Title, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import flexStyles from '@patternfly/patternfly-next/utilities/Flex/flex.css';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PortfolioCard from '../../PresentationalComponents/Portfolio/PorfolioCard';
import ModalWrapper from '../../PresentationalComponents/Shared/ModalWrapper';
import FormRenderer from '../Common/FormRenderer';
import { addPortfolio, fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { addPortfolioSchema } from '../../forms/schemas/portfolios';

import './portfolio.scss';

class Portfolios extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = apiProps => this.props.fetchPortfolios(apiProps);

  toggleModal = isOpen => this.setState({ isOpen });

  onSubmit = data => this.props.addPortfolio(data).then(() => {
    this.toggleModal(false);
    return this.props.fetchPortfolios();
  });
  onCancel = () => {
    this.props.addNotification({
      variant: 'warning',
      title: 'Adding portfolio',
      description: 'Adding portfolio was cancelled by the user.'
    });
    this.toggleModal(false);
  }

  renderToolbar() {
    return (
      <Toolbar className={ css(flexStyles.justifyContentSpaceBetween, spacingStyles.mxXl, spacingStyles.myMd) }>
        <ToolbarGroup>
          <ToolbarItem className={ css(spacingStyles.mrXl) }>
            <Title size={ '2xl' }> All Portfolios</Title>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup  className={ 'pf-u-ml-auto-on-xl' }>
          <ToolbarItem>
            <Button
              variant="primary"
              onClick={ () => this.toggleModal(true) }
              aria-label="Create Portfolio"
            >
              Create Portfolio
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    let filteredItems = {
      items: this.props.portfolios.map((item) => <PortfolioCard key={ item.id } { ...item } />),
      isLoading: this.props.isLoading
    };
    return (
      <Fragment>
        { this.renderToolbar() }
        <ContentGallery { ...filteredItems } />
        <ModalWrapper
          title="Create Portfolio"
          isOpen={ this.state.isOpen }
          onClose={ this.onCancel }
          bodyProps={ { id: 'create-portfolio-modal' } }
        >
          <FormRenderer
            schema={ addPortfolioSchema }
            onSubmit={ this.onSubmit }
            onCancel={ this.onCancel }
            schemaType="mozilla"
          />
        </ModalWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ portfolioReducer: { portfolios, isLoading, filterValue }}) => ({
  portfolios,
  isLoading,
  searchFilter: filterValue
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPortfolios,
  addNotification,
  addPortfolio
}, dispatch);

Portfolios.propTypes = {
  filteredItems: propTypes.array,
  portfolios: propTypes.array,
  platforms: propTypes.array,
  isLoading: propTypes.bool,
  searchFilter: propTypes.string,
  showModal: propTypes.func,
  hideModal: propTypes.func,
  history: propTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolios));
