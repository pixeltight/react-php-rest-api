import React, { Component } from 'react'
import $ from 'jquery'

class UpdateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      selectedCategoryId: 0,
      id: 0,
      name: '',
      description: '',
      price: 0,
      successUpdate: null
    }

    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  
  componentDidMount () {

    // read categories
    this.serverRequestCat = $.get('http://localhost/api_php/category/read.php', function (categories) {
      this.setState({ categories: categories.records })
    }.bind(this))

    let productId = this.props.productId
    this.serverRequestProd = $.get('http://localhost/api_php/product/read_one.php?id=' + productId, function (product) {
        this.setState({selectedCategoryId: product.category_id})
        this.setState({id: product.id})
        this.setState({name: product.name})
        this.setState({description: product.description})
        this.setState({price: product.price})
    }.bind(this))
    $('.page-header h1').text('Update Product')
  }

  componentWillUnount () {
    this.serverRequestCat.abort()
    this.serverRequestProd.abort()
  }

  // handle form field changes
  // category change
  onCategoryChange (e) {
    this.setState({selectedCategoryId: e.target.value})
  }

  // name change
  onNameChange (e) {
    this.setState({name: e.target.value})
  }

  // description change
  onDescriptionChange (e) {
    this.setState({description: e.target.value})
  }

  // price change
  onPriceChange (e) {
    this.setState({price: e.target.value})
  }

  onSave (e) {

    // data in form
    let form_data = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      category_id: this.state.selectedCategoryId
    }
    console.log(JSON.stringify(form_data))
    $.ajax({
      url: 'http://localhost/api_php/product/update.php',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(form_data),
      success: function (response) {
        this.setState({successUpdate: response['message']})
      }.bind(this),
      error: function (xhr, resp, text) {
        console.log('AJAX error: ', xhr, resp, text)
      }
    })

    e.preventDefault()
  }
  
  render() {
    let categoriesOptions = this.state.categories.map((category) =>
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    )

    return (
      <div>
        {
          this.state.successUpdate === 'Product was updated.' ?
            <div className='alert alert-success'>
              Product was updated.
            </div> : null
        }

        {
          this.state.successUpdate === 'Unable to update product.' ?
            <div className='alert alert-dange'>
              Unable to update product. Please try again.
            </div> : null
        }

        <span onClick={() => this.props.toggleView('read')}
          className='btn btn-primary margin-bottom-1em'>
            Read Products
        </span>

        <form>
          <table className='table table-bordered table-hover'>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type='text' 
                    className='form-control'
                    value={this.state.name} 
                    required
                    onChange={this.onNameChange} />
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <textarea type='text' 
                    className='form-control'
                    value={this.state.description} 
                    required
                    onChange={this.onDescriptionChange}></textarea>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type='number'
                    step='0.01'
                    className='form-control'
                    value={this.state.price} 
                    required
                    onChange={this.onPriceChange} />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select className='form-control'
                    value={this.state.selectedCategoryId} 
                    onChange={this.onCategoryChange}>
                      <option value='-1'>Select category...</option>
                      {categoriesOptions}
                    </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className='btn btn-primary'
                    onClick={this.onSave}>Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>














      </div>
    )
  }
}

export default UpdateProduct