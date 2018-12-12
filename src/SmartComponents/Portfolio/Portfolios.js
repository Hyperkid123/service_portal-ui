import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Section } from '@red-hat-insights/insights-frontend-components';
import { Toolbar, ToolbarGroup, ToolbarItem, Title, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import flexStyles from '@patternfly/patternfly-next/utilities/Flex/flex.css';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PortfolioCard from '../../PresentationalComponents/Portfolio/PorfolioCard';
import { fetchPortfolios } from '../../Store/Actions/PortfolioActions';
import MainModal from '../Common/MainModal';
import { hideModal, showModal } from '../../Store/Actions/MainModalActions';
import './portfolio.scss';

class Portfolios extends Component {
  state = {
    filteredItems: [],
    isOpen: false
  };

  fetchData(apiProps) {
    this.props.fetchPortfolios(apiProps);
  }

  componentDidMount() {
    this.fetchData();
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
              onClick={ () => {
                // why using this.props to create porftolio?
                // shoul be only open modal
                this.onClickCreatePortfolio(this.props);
              } }
              aria-label="Create Portfolio"
            >
              Create Portfolio
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

    onClickCreatePortfolio = () => {
      this.props.showModal({
        open: true,
        closeModal: this.props.hideModal
      }, 'addportfolio');

      this.setState({
        ...this.state,
        isOpen: !this.state.isOpen
      });
    };

    render() {
      let filteredItems = {
        items: this.props.portfolios.map((item) => <PortfolioCard key={ item.id } { ...item } />),
        isLoading: this.props.isLoading
      };

      return (
        <Section>
          <div className="action_toolbar">
            { this.renderToolbar() }
          </div>
          <ContentGallery { ...filteredItems } />
          <MainModal />
        </Section>
      );
    }
}

function mapStateToProps(state) {
  return {
    portfolios: state.PortfolioStore.portfolios,
    isLoading: state.PortfolioStore.isLoading,
    searchFilter: state.PortfolioStore.filterValue
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolios: apiProps => dispatch(fetchPortfolios(apiProps)),
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }));
    }
  };
};

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Portfolios)
);
