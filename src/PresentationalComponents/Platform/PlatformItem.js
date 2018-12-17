import React from 'react';
import propTypes from 'prop-types';
import CatItemSvg from '../../assets/images/vendor-openshift.svg';
import ImageWithDefault from '../Shared/ImageWithDefault';
import { GridItem, Card, CardHeader, CardBody, Dropdown, DropdownItem, DropdownPosition, DropdownToggle } from '@patternfly/react-core';
import ItemDetails from '../../PresentationalComponents/Shared/CardCommon';

import './platformitem.scss';

const TO_DISPLAY = [ 'description' ];

class PlatformItem extends React.Component {
  state = {
    isOpen: true,
    showMenu: false
  };

  handleMenuOpen = () => this.setState({ isOpen: true });

  handleMenuClose = () => this.setState({ isOpen: false });

  showPortfolioMenu = () => this.setState({ showMenu: true });

  hidePortfolioMenu = () => this.setState({ showMenu: false });

  portfolioOptions = [
    { value: 'new', label: 'Add Portfolio', disabled: false }
  ];

  addPortfolioOptions = () => {
    //for each portfolio in portfolios, add an option in the portfolioOptions array
  };

  render() {
    return (
      <GridItem sm={ 6 } md={ 4 } lg={ 4 } xl={ 3 }>
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
                    <DropdownItem onClick={ this.props.openModal } component="button">
                      Add Portfolio
                    </DropdownItem>
                  </Dropdown>
                </div>
              }
              <h4>{ this.props.name }</h4>
              { <ItemDetails { ...this.props } toDisplay={ TO_DISPLAY } /> }
            </CardBody>
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

export default PlatformItem;
