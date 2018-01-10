import React, { Component } from 'react'

class ProductRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.category_name}</td>
        <td>
          <span onClick={() => this.props.toggleView('readOne', this.props.product.id)}
           className='btn btn-info m-r-1em'>Read One</span>
           <span onClick={() => this.props.toggleView('update', this.props.product.id)}
           className='btn btn-primary m-r-1em'>Edit</span>
           <span onClick={() => this.props.toggleView('delete', this.props.product.id)}
           className='btn btn-danger m-r-1em'>Delete</span>
        </td>
      </tr>
    )
  }
}

export default ProductRow
