import React, { Component } from 'react'

// component that contains the functionalities that appear on top of
// the products table: create product
class TopActions extends Component {
  render () {

    return (
      <div>
        <span
          onClick={() => this.props.toggleView('create')}
          className='btn btn-primary margin-bottom-1em'>Create product
        </span>
      </div>
    )
  }
}

export default TopActions
