import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { parse } from 'querystring';
import { Main } from '@red-hat-insights/insights-frontend-components';
import { fetchPlatformItems } from '../../Store/Actions/PlatformActions';
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSection } from '@patternfly/react-core';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import MainModal from '../Common/MainModal';
import './platformitems.scss';

class PlatformItems extends Component {
  state = {
    showItems: '',
    filteredItems: []
  }

  fetchData(apiProps) {
    this.props.fetchPlatformItems({ ...apiProps });
  }

  componentDidMount() {
    let filter = this.props.computedMatch.params.filter;
    console.log('PlatformItems filter: ', filter);
    let parsed = parse(filter);
    console.log('PlatformItems parsed filter: ', parsed);
    this.fetchData(parsed);
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
      items: this.props.platformItems.platformItems,
      isLoading: this.props.isLoading
    };
    return (
      <Main style={ { marginLeft: 0, paddingLeft: 0, paddingTop: 0 } }>
        <ContentGallery { ...filteredItems } />
        <MainModal />
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  platformItems: state.PlatformStore.platformItems,
  isLoading: state.PlatformStore.isPlatformDataLoading
});

const mapDispatchToProps = dispatch => ({
  fetchPlatformItems: apiProps => dispatch(fetchPlatformItems(apiProps))
});

PlatformItems.propTypes = {
  filteredItems: propTypes.object,
  platforms: propTypes.object,
  isLoading: propTypes.bool,
  history: propTypes.object
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlatformItems)
);
