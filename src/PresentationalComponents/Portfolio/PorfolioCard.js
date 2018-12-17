import React from 'react';
import { withRouter } from 'react-router-dom';
import './portfoliocard.scss';
import propTypes from 'prop-types';
import DefaultPortfolioImg from '../../assets/images/default-portfolio.jpg';
import ImageWithDefault from '../Shared/ImageWithDefault';
import ItemDetails from '../Shared/CardCommon';
import { GridItem, Card, CardHeader, CardBody, CardFooter, Text, TextVariants } from '@patternfly/react-core';

const TO_DISPLAY = [ 'description', 'modified' ];

class PortfolioCard extends React.Component {
  render() {
    return (
      <GridItem sm={ 6 } md={ 4 } lg={ 4 } xl={ 3 }>
        <Card className="pcard_style">
          <CardHeader className="pcard_header">
            <ImageWithDefault src={ this.props.imageUrl || DefaultPortfolioImg } defaultSrc={ DefaultPortfolioImg } />
          </CardHeader>
          <CardBody className="pcard_body">
            <Text component={ TextVariants.h4 }>{ this.props.name }</Text>
            { <ItemDetails { ...this.props } toDisplay={ TO_DISPLAY }/> }
          </CardBody>
          <CardFooter/>
        </Card>
      </GridItem>
    );
  };
}

PortfolioCard.propTypes = {
  history: propTypes.object,
  imageUrl: propTypes.string,
  name: propTypes.string
};

export default withRouter(PortfolioCard);
