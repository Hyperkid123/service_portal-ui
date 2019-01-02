import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavGroup, NavItem } from '@patternfly/react-core';
import { fetchPlatforms } from '../../redux/Actions/PlatformActions';
import { fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import { toggleEdit } from '../../redux/Actions/UiActions';
import './portalnav.scss';

const ALL_PORTFOLIOS_URL = '/portfolios';
const PLATFORM_ITEM_URL_BASE = '/platform_items';
const PORTFOLIO_URL_BASE = '/portfolios';

class PortalNav extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
  // TODO - only call if the user is an admin
    this.props.fetchPlatforms();
    this.props.fetchPortfolios();
  }

  platformNavItems = () => this.props.platforms.map(item => (
    <NavItem key={ item.id } id={ item.id } groupId="platforms">
      <NavLink to={ `${PLATFORM_ITEM_URL_BASE}/${item.id}` }>
        { item.name }
      </NavLink>
    </NavItem>
  ));

  portfolioNavItems = () => this.props.portfolios.map(item => (
    <NavItem key={ item.id } id={ item.id }>
      <NavLink to={ `${PORTFOLIO_URL_BASE}/${item.id}` }>
        { item.name }
      </NavLink>
    </NavItem>
  ));

  render() {
    return (
      <Nav aria-label="Service Portal" className="portal-nav">
        <NavGroup title="Platforms">
          { this.platformNavItems() }
        </NavGroup>
        <NavGroup title="Portfolios">
          <NavItem key='all' id="all-portfolios">
            <NavLink exact to={ ALL_PORTFOLIOS_URL }>
              All Portfolios
            </NavLink>
          </NavItem>
          { this.portfolioNavItems() }
        </NavGroup>
      </Nav>
    );
  }
}

const mapStateToProps = ({
  platformReducer: { platforms, isPlatformDataLoading },
  portfolioReducer: { isLoading, portfolios }
}) => ({
  isPlatformDataLoading,
  platforms,
  isLoading,
  portfolios
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPlatforms,
  fetchPortfolios,
  toggleEdit
}, dispatch);

PortalNav.propTypes = {
  portfolios: propTypes.array,
  platforms: propTypes.array,
  isPlatformDataLoading: propTypes.bool,
  fetchPortfolios: propTypes.func,
  fetchPlatforms: propTypes.func,
  toggleEdit: propTypes.func,
  isLoading: propTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(PortalNav);
