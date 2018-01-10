import React, { Component } from 'react'
import $ from 'jquery'

class CreateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [''],
      seclectedCategoryId: 0,
      name: '',
      description: '',
      price: null,
      successCreated : null
    }

    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount () {
    this.serverRequest = $.get('http://localhost/api_php/category/read.php', (categories) => {
      this.setState({ categories: categories.records })
    })

    $('.page-header h1').text('Create product')
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  // handle form field changes
  // handle category change
  onCategoryChange (e) {
    this.setState({ seclectedCategoryId: e.target.value })
  }

  // handle name change
  onNameChange (e) {
    this.setState({ name: e.target.value })
  }

  // handle description change
  onDescriptionChange (e) {
    this.setState({ description: e.target.value })
  }

  // handle price change
  onPriceChange (e) {
    this.setState({ price: e.target.value })
  }

  // handle save buton here
  onSave (e) {
  let form_data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      category_id: this.state.seclectedCategoryId
    }
    console.log('Form Data: ', form_data)
    $.ajax({
      url: 'http://localhost/api_php/product/create.php',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(form_data),
      success: function (response) {
        this.setState({ successCreated: response['message']})
        this.setState({ name: '' })
        this.setState({ description: '' })
        this.setState({ price: '' })
        this.setState({ seclectedCategoryId: -1 })
      }.bind(this),
      error: function (xhr, resp, text) {
        console.log('AJAX error: ', xhr, resp, text)
      }
    })
    e.preventDefault()

  }

  render () {
    // make caetgories as option for the select tag
    //let categoriesOptions = 

    /*
    - let user know if product was created
    - tell user if unable to create product
    - button to go back to products list
    - form to create a product
    */

    return (
      <div>
        {
          this.state.successCreated === 'Product was created.' ?
            <div className='alert alert-success'>
              Product was saved.
            </div> : null
        }

        {
          this.state.successCreated === 'Unable to create product.' ?
            <div className='alert alert-danger'>
              Unable to save product. Please try again.
            </div> : null
        }

        <span onClick={() => this.props.toggleView('read')}
          className='btn btn-primary margin-bottom-1em'>
            Read Products
        </span>

        <form onSubmit={this.onSave}>
          <table className='table table-bordered table-hover'>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type='text'
                    className='form-control'
                    onChange={this.onNameChange}
                    value={this.state.name}
                    required />
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
                <td>Price ($)</td>
                <td>
                  <input type='number'
                    className='form-control'
                    value={parseFloat(this.state.price).toFixed(2)} 
                    onChange={this.onPriceChange} 
                    step='0.01'
                    required />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select
                    className='form-control'
                    value={this.state.seclectedCategoryId}
                    onChange={this.onCategoryChange}>
                    <option value={-1}>Select category...</option>
                    {this.state.categories.map((category, i) => 
                      <option value={category.id} key={i}>{category.name}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className='btn btn-primary' onClick={this.onSave}>
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default CreateProduct
