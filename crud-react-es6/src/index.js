import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReadProducts from './product/ReadProducts'
import ReadOneProduct from './product/ReadOneProduct'
import CreateProduct from './product/CreateProduct'
import UpdateProduct from './product/UpdateProduct'
import DeleteProduct from './product/DeleteProduct'

class MainApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMode: 'read',
      productId: null
    }

    this.toggleView = this.toggleView.bind(this)
  }

  toggleView(newView, productId) {
    this.setState({
      currentMode: newView
    })
    if (productId !== undefined) {
      this.setState({productId: productId})
    }
  }

  render() {
    let modeComponent = <ReadProducts toggleView={this.toggleView} />

    switch(this.state.currentMode) {
      case 'read':
      break
      case 'readOne':
        modeComponent = <ReadOneProduct productId={this.state.productId} toggleView={this.toggleView} />
        break
      case 'create':
        modeComponent = <CreateProduct toggleView={this.toggleView} />
      break
      case 'update':
        modeComponent = <UpdateProduct productId={this.state.productId} toggleView={this.toggleView} />
      break
      case 'delete':
        modeComponent = <DeleteProduct productId={this.state.productId} toggleView={this.toggleView} />
      break
      default:
      break
    }
    return modeComponent
  }
}

ReactDOM.render(
    <MainApp />,
    document.getElementById('root')
);
