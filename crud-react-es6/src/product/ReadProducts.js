import React, {Component} from 'react'
import $ from 'jquery'
import TopActions from './TopActions'
import ProductsTable from './ProductsTable'

class ReadProducts extends Component {
  // on mount, fetch all products and stored them as this component's state
  constructor(props) {
    super(props)
    this.state = { products: [] }
  }

  componentDidMount () {
    this.serverRequest = $.get('http://localhost/api_php/product/read.php', (products) => {
          console.log(`first instance: ${JSON.stringify(products.records[0])}`)
      this.setState({
          products: products.records
      })
    })
  }

  // componentWillUpdate (nextProps, nextState) {
  //   console.log('Prev products state: ', this.state.products)
  //   console.log('Next procucts state: ', nextState.products)
  // }

  // on unmount, kill product fetching in case the request is still pending
  componentWillUnmount () {
    this.serverRequest.abort()
  }

  // render component on the page
  render () {
    $('.page-header h1').text('Read Products')
    // list of products
    return (
      <div className='overflow-hidden'>
        <TopActions toggleView={this.props.toggleView} />
        <ProductsTable products={this.state.products} toggleView={this.props.toggleView} />
      </div>
    )
  }
}

export default ReadProducts
