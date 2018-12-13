import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './platformitem.scss';
import propTypes from 'prop-types';
import CatItemSvg from '../../assets/images/vendor-openshift.svg';
import ImageWithDefault from '../Shared/ImageWithDefault';
import { hideModal, showModal } from '../../redux/Actions/MainModalActions';
import { GridItem, Card, CardHeader, CardBody, CardFooter } from '@patternfly/react-core';
import { Dropdown, DropdownItem, DropdownPosition, DropdownToggle } from '@patternfly/react-core';
import itemDetails from '../../PresentationalComponents/Shared/CardCommon';
import { bindMethods } from '../../Helpers/Shared/Helper';

const TO_DISPLAY = [ 'description' ];

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }));
    }
  };
};

class PlatformItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true, showMenu: false };
    bindMethods(this, [ 'onSelect', 'handleMenuOpen', 'handleMenuClose', 'showPortfolioMenu', 'hidePortfolioMenu' ]);
  };

  handleMenuOpen() {
    this.setState({ isOpen: true });
  }

  handleMenuClose() {
    this.setState({ isOpen: false });
  }

  showPortfolioMenu() {
    this.setState({ showMenu: true });
  }

  hidePortfolioMenu() {
    this.setState({ showMenu: false });
  }

  portfolioOptions = [
    { value: 'new', label: 'Add Portfolio', disabled: false }
  ];

  addPortfolioOptions() {
    //for each portfolio in portfolios, add an option in the portfolioOptions array
  };

  onSelect() {
    // Settings props to instance!
    this.props.showModal({
      open: true,
      itemdata: this.props,
      closeModal: this.props.hideModal
    }, 'addportfolio');

    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <GridItem key={ this.props.id } GridItem sm={ 6 } md={ 4 } lg={ 4 } xl={ 3 }>
        <Card onMouseEnter = { this.showPortfolioMenu }
          onMouseLeave = { this.hidePortfolioMenu }
        >
          <div className="card_style_with_hover" key={ this.props.id }>
            <CardHeader className="card_header">
              <ImageWithDefault src={ this.props.imageUrl || CatItemSvg } defaultSrc={ CatItemSvg } width="50" height="50" />
            </CardHeader>
            <CardBody className="card_body">
              { this.state.showMenu &&
                <div className = "mask flex-center rgba-grey-strong">
                  <Dropdown
                    isOpen={ this.state.isOpen }
                    onSelect={ this.onSelect }
                    position={ DropdownPosition.left }
                    toggle={ <DropdownToggle onToggle={ this.onToggle }> Portfolio </DropdownToggle> }
                    id="dropdown-menu" itemdata={ [ this.props ] }
                  >
                    <DropdownItem key="action" component="button">
                            Add Portfolio
                    </DropdownItem>
                  </Dropdown>
                </div>
              }
              <h4>{ this.props.name }</h4>
              { itemDetails(this.props, TO_DISPLAY) }
            </CardBody>
            <CardFooter>
            </CardFooter>
          </div>
        </Card>
      </GridItem>
    );
  };
}

PlatformItem.propTypes = {
  history: propTypes.object,
  showModal: propTypes.func,
  hideModal: propTypes.func,
  imageUrl: propTypes.string,
  id: propTypes.string,
  name: propTypes.string
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps)(PlatformItem)
);

