import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindMethods } from '../../Helpers/Shared/Helper';
import { Nav, NavGroup, NavItem } from '@patternfly/react-core';
import { fetchPlatforms } from '../../Store/Actions/PlatformActions';
import { fetchPortfolios } from '../../Store/Actions/PortfolioActions';
import { toggleEdit } from '../../Store/Actions/UiActions';
import './portalnav.scss';

const ALL_PORTFOLIOS_URL = '/insights/platform/service-portal/portfolios';
const PLATFORM_ITEM_URL_BASE = `/insights/platform/service-portal/platform_items/platform=`;
const PORTFOLIO_URL_BASE = `/insights/platform/service-portal/portfolios/`;

class PortalNav extends React.Component {
    state = {
      activeItem: null,
      activeGroup: 'platforms',
      isEditing: false
    };

    componentDidMount() {
      this.fetchData();
      bindMethods(this, [ 'onSelect' ]);
    }

    fetchData() {
    // TODO - only call if the user is an admin
      this.props.fetchPlatforms();
      this.props.fetchPortfolios();
    }

    platformNavItems = () => {
      if (this.props.platforms) {
        return this.props.platforms.map(item => (
          <NavItem key={ item.id }
            itemId={ item.id }
            groupId="platforms"
            to={ PLATFORM_ITEM_URL_BASE + `${item.id}` }
          >
            { item.name }
          </NavItem>
        ));
      }
      else {
        return null;
      }
    };

    portfolioNavItems = () => {
      if (this.props.portfolios) {
        return this.props.portfolios.map(item => (
          <NavItem
            key={ item.id }
            groupId="portfolios"
            to={ PORTFOLIO_URL_BASE + `${item.id}` }
          >
            { item.name }
          </NavItem>
        ));
      } else {
        return null;
      }
    };

    onSelect = ({ itemId, groupId }) => this.setState({
      activeItem: itemId,
      activeGroup: groupId
    });

    render() {
      return <Nav onSelect= { this.onSelect } aria-label="Service Portal">
        <NavGroup title="Platforms">
          { !this.props.isPlatformDataLoading && this.platformNavItems() }
        </NavGroup>
        <NavGroup title="Portfolios">
          <NavItem
            key='all'
            groupId="portfolios"
            to={ ALL_PORTFOLIOS_URL }
          >
                    All Portfolios
          </NavItem>
          { !this.props.isLoading && this.portfolioNavItems() }
        </NavGroup>
      </Nav>;
    }
}

const mapStateToProps = state => ({
  isPlatformDataLoading: state.PlatformStore.isPlatformDataLoading,
  platforms: state.PlatformStore.platforms,
  isLoading: state.PortfolioStore.isLoading,
  portfolios: state.PortfolioStore.portfolios
});

const mapDispatchToProps = dispatch => ({
  fetchPlatforms: () => dispatch(fetchPlatforms()),
  fetchPortfolios: () => dispatch(fetchPortfolios()),
  toggleEdit: () => dispatch(toggleEdit())
});

PortalNav.propTypes = {
  portfolios: propTypes.array,
  platforms: propTypes.array,
  isPlatformDataLoading: propTypes.bool,
  fetchPortfolios: propTypes.func,
  fetchPlatforms: propTypes.func,
  toggleEdit: propTypes.func,
  isLoading: propTypes.bool,
  location: propTypes.object,
  history: propTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortalNav));
