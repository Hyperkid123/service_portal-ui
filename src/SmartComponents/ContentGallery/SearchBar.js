import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Input } from '@red-hat-insights/insights-frontend-components';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    e.preventDefault();
    this.props.searchCallback(e.target.value);
    this.props.fetchData({ catalog_items_list: [ e.target.value ], page: 1 });
  }

  render() {
    return (
      <form className="pf-c-form">
        <div className="pf-c-form__group ">
          <div className="pf-c-input-group">
            <button className="pf-c-button pf-m-secondary">
              <i className="fas fa-search" />
            </button>
            <Input type="text" name="searchInput" value={ this.props.searchValue || '' } onChange={ this.updateState } />
          </div>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchValue: propTypes.string,
  fetchData: propTypes.func,
  searchCallback: propTypes.func
};

export default SearchBar;
