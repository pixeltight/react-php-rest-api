import React, { Component } from 'react'
import ProductRow from './ProductRow'

// component for entire products table
class ProductsTable extends Component {
  render () {
    let rows = this.props.products.map((product, i) => {
      return(
        <ProductRow
          key={product.id}
          product={product}
          toggleView={this.props.toggleView} />
      )
    })
    
    return (
      !rows.length
        ? <div className='alert alert-danger'>No products found.</div>
        : <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    )
  }
}

export default ProductsTable
