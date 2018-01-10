import React, { Component } from 'react'
import $ from 'jquery'

class DeleteProduct extends Component {
  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
  }
  componentDidMount () {
    $('.page-header h1').text('Delete Product')
  }

  onDelete (e) {
    let productId = this.props.productId

    $.ajax({
      url: 'http://localhost/api_php/product/delete.php',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'id': productId}),
      success: function (response) {
        this.props.toggleView('read')
      }.bind(this),
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text)
      }
    })
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-3'></div>
          <div className='col-md-6'>
            <div className='panel panel-default'>
              <div className='panel-body text-align-center'>Are you sure?</div>
              <div className='panel-footer clearfix'>
                <button onClick={this.onDelete} className='btn btn-danger m-r-1em'>
                  Yes
                </button>
                <button onClick={() => this.props.toggleView('read')} className='btn btn-primary'>
                  No
                </button>
              </div>
            </div>
          </div>
        <div className='col-md-3'></div>
      </div>
    )
  }
}

export default DeleteProduct