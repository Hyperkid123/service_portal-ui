import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { Main } from '@red-hat-insights/insights-frontend-components';
import { fetchPlatformItems } from '../../redux/Actions/PlatformActions';
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSection } from '@patternfly/react-core';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PlatformItem from '../../PresentationalComponents/Platform/PlatformItem';
import ModalWrapper from '../../PresentationalComponents/Shared/ModalWrapper';
import FormRenderer from '../Common/FormRenderer';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { addPortfolioSchema } from '../../forms/schemas/portfolios';

import './platformitems.scss';

class PlatformItems extends Component {
  state = {
    showItems: '',
    filteredItems: [],
    isOpen: false
  }

  fetchData(apiProps) {
    this.props.fetchPlatformItems({ ...apiProps });
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(this.props.match.params.id);
    }
  }
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
      <Toolbar style={ { backgroundColor: '#ffffff', marginLeft: '8px', paddingBottom: '10px', paddingLeft: '20px' } }>
        <ToolbarSection>
          <ToolbarGroup>
            <ToolbarItem>Select Platform</ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem>Search</ToolbarItem>
            <ToolbarItem>Sort</ToolbarItem>
          </ToolbarGroup>
        </ToolbarSection>
      </Toolbar>);
  }

  render() {
    let filteredItems = {
      items: this.props.platformItems.map(data => <PlatformItem key={ data.id } openModal={ () => this.toggleModal(true) } { ...data } />),
      isLoading: this.props.isLoading
    };
    return (
      <Main style={ { marginLeft: 0, paddingLeft: 0, paddingTop: 0 } }>
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
      </Main>
    );
  }
}

const mapStateToProps = ({ platformReducer: { platformItems, isPlatformDataLoading }}) => ({
  platformItems,
  isLoading: isPlatformDataLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPlatformItems,
  addNotification
}, dispatch);

PlatformItems.propTypes = {
  filteredItems: propTypes.object,
  platforms: propTypes.object,
  isLoading: propTypes.bool,
  history: propTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlatformItems));
