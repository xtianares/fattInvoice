import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Table,
  Button,
  Alert,
} from 'reactstrap';
import axios from "axios";
import API from "../services/apiService";

class CreateInvoice extends Component {
  state = {
    subTotal: 0,
    invoiceTotal: 0,
    invoiceDiscount: 0,
    itemList: [],
    customerList: [],
    lineItems: [],
    // start item tempInfo
    itemId: '', // optional
    itemItem: '',
    itemQuantity: 0,
    itemDetails: '',
    itemPrice: 0,
    // end item tempInfo
    customerId: "",
    itemIndex: 0,
    invoiceMemo: "",
    success: false,
    error: false,
  }

  componentDidMount = () => {
    axios.all([
      API.getItems(),
      API.getCustomers(),
    ])
    .then(axios.spread((items, customers) => {

      this.setState({
        itemList: items.data.data,
        customerList: customers.data.data,
      }, () => {
        // console.log(this.state.itemList)
        // console.log(this.state.customerList)
      })
    }))
    .catch(err => {
      if (err.response?.status > 400) { console.log(err.response?.status, err.response?.statusText) }
      else { console.log(err.response?.data?.errors) }
    });
  }

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    const theValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: theValue
    }, () => {
      // console.log(this.state);
    });
  }

  handleItemChange = event => {
    const { value, name } = event.target;
    const theItem = this.state.itemList.filter(item => item.id === value)[0]
    // console.log("value:", value)
    // console.log("theItem:", theItem)
    this.setState({
      [name]: value,
      itemItem: theItem.item,
      itemQuantity: 1,
      itemDetails: theItem.details,
      itemPrice: theItem.is_discount ? `-${theItem.price?.toFixed(2)}` : theItem.price?.toFixed(2) || 0,
    }, () => {
      // console.log(this.state);
    });
  }

  addItem = item => {
    let lineItems = this.state.lineItems;
    const itemDetails = {
      id: this.state.itemId,
      item: this.state.itemItem,
      details: this.state.itemDetails,
      quantity: this.state.itemQuantity,
      price: this.state.itemPrice,
    };
    if (itemDetails.id) {
      lineItems.push(itemDetails);
    }
    const subTotal = lineItems.reduce(function (acc, item) {
      return acc + (item.price * item.quantity);
    }, 0);
    this.setState({
      invoiceSubTotal: Number(subTotal),
      invoiceTotal: Number(subTotal) - Number(this.state.invoiceDiscount),
      lineItems,
      itemId: '', // optional
      itemItem: '',
      itemQuantity: 0,
      itemDetails: '',
      itemPrice: 0,
      itemIndex: this.state.itemIndex + 1,
    }, () => {
      // console.log(lineItems);
      // console.log("lineItems: ");
      // console.log(this.state);
    });
  }

  removeItem = index => {
    let lineItems = this.state.lineItems;
    lineItems.splice(index, 1);
    const subTotal = lineItems.reduce(function (acc, item) {
      return acc + (item.price * item.quantity);
    }, 0);
    this.setState({
      invoiceSubTotal: Number(subTotal),
      invoiceTotal: Number(subTotal) - Number(this.state.invoiceDiscount),
      lineItems,
      itemIndex: this.state.itemIndex - 1,
    }, () => {
      // console.log(lineItems);
      // console.log("lineItems: ");
      // console.log(this.state);
    });
  }
  
  toggleSuccess = () => {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleError = () => {
    this.setState({
      error: !this.state.error,
    });
  }

  resetForm = event => {
    if (event) { event.preventDefault() }
    this.setState({
      subTotal: 0,
      invoiceTotal: 0,
      invoiceDiscount: 0,
      lineItems: [],
      itemId: '', // optional
      itemItem: '',
      itemQuantity: 0,
      itemDetails: '',
      itemPrice: 0,
      customerId: "",
      itemIndex: 0,
      invoiceMemo: "",
    }, () => {
      // console.log(this.state);
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const invoiceData = {
      customer_id: this.state.customerId,
      // payment_method_id: 'd3050b19-77d9-44ac-9851-b1d1680a7684',
      meta: {
        memo: this.state.invoiceMemo,
        subtotal: this.state.invoiceSubTotal,
        lineItems: this.state.lineItems,
      },
      total: this.state.invoiceTotal,
      url: 'https://omni.fattmerchant.com/#/bill/',
    }
    // console.log(invoiceData)

    if (this.state.lineItems.length > 0 && this.state.customerId !== "") {
      API.createInvoice(invoiceData).then((invoiceData) => {
        // clear form entries
        this.resetForm()
        this.toggleSuccess()
        console.log("Invoice Created:", invoiceData.data);
        // show success message
      })
      .catch(err => {
        if (err.response?.status > 400) { console.log(err.response?.status, err.response?.statusText) }
        else { console.log(err.response?.data?.errors) }
      });
    }
    else {
      // show validation error
      this.toggleError()
    }
  }

  render() {
    const customerOptions = this.state.customerList.map((customer, index) => (
      <option key={index} value={customer.id}>{customer.firstname} {customer.lastname}</option>
    ));
    const itemOptions = this.state.itemList.map((item, index) => (
      <option key={index} value={item.id}>{item.item}</option>
    ));
    const invoiceTotal = Number(this.state.invoiceTotal) < 0 ? `($${Number(this.state.invoiceTotal).toFixed(2).replace("-","")})` : `$${Number(this.state.invoiceTotal).toFixed(2)}`
    const itemList = this.state.itemList
    const lineItems = this.state.lineItems.map((item, index) => {
      // <option key={index} value={item.id}>{item.item}</option>
      const total = Number(item.price * item.quantity);
      const itemIndex = index + 1;
      const isDiscount = itemList.filter(listItem => listItem.id === item.id)[0].is_discount;
      const itemPrice = isDiscount ? `($${Number(item.price).toFixed(2).replace("-","")})` : Number(item.price).toFixed(2)
      const itemTotal = isDiscount ? `($${Number(total).toFixed(2).replace("-","")})` : (Number(item.price) * item.quantity).toFixed(2)
      return (
          <tr key={index}>
            <th scope="row" className="text-center">{itemIndex}</th>
            <td>{item.item} <small className="font-weight-lighter text-muted">(<span className="remove-item" onClick={() => this.removeItem(index)}>Remove Item</span>)</small></td>
            <td className="text-center">{itemPrice}</td>
            <td className="text-center">{item.quantity}</td>
            <td className="text-right">{itemTotal}</td>
          </tr>
        )
      });
  
    return (
      <Container className="h-100">
        <Row className="justify-content-center h-100">
          <Col sm="12">
            <Form onSubmit={this.handleFormSubmit}>
              <h2 className="mt-2">Use the form below to create an invoice</h2>
              <div className="form-row">
                <FormGroup className="col-md-6">
                  <Label className="text-sm-right" htmlFor="customerId">Customer Name</Label>
                  <CustomInput onChange={this.handleChange} value={this.state.customerId} type="select" name="customerId" id="customerId">
                    <option value="">Choose Customer</option>
                    {customerOptions}
                  </CustomInput>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label htmlFor="invoiceMemo">Invoice Memo</Label>
                  <Input onChange={this.handleChange} value={this.state.invoiceMemo} type="text" name="invoiceMemo" id="invoiceMemo" />
                </FormGroup>

                <FormGroup className="col-md-6">
                  <Label htmlFor="itemId">Select an Item</Label>
                  <CustomInput onChange={this.handleItemChange} value={this.state.itemId} type="select" name="itemId" id="itemId">
                    <option value="">Choose Item</option>
                    {itemOptions}
                  </CustomInput>
                </FormGroup>
                <FormGroup className="col-md-2">
                  <Label htmlFor="itemQuantity">Quantity</Label>
                  <Input onChange={this.handleChange} value={this.state.itemQuantity} type="text" name="itemQuantity" id="itemQuantity" />
                </FormGroup>
                <FormGroup className="col-md-2">
                  <Label htmlFor="itemPrice">Unit Price</Label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <Input onChange={this.handleChange} value={this.state.itemPrice} type="text" name="itemPrice" id="itemPrice" disabled />
                  </div>
                </FormGroup>
                
                <FormGroup className="col-md-2 d-flex">
                  <Button className="add-item align-self-end" color="success" outline type="button" onClick={() => this.addItem()}>Add Item</Button>
                </FormGroup>
              </div>

              <h3 className="mt-3 mb-1">Please review the invoice summary below before submitting, thanks!</h3>
              <Table className="mt-3" responsive bordered>
                <thead  className="thead-dark text-center">
                  <tr>
                    <th>#</th>
                    <th className="text-left">Item</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <th scope="row" colSpan="4" className="text-right">Subtotal</th>
                    <td className="text-right">{this.state.invoiceSubTotal}</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="4" className="text-right">Discount</th>
                    <td className="text-right"></td>
                  </tr> */}
                  { this.state.lineItems.length < 1 ?
                    <tr>
                      <th scope="row" className="text-center">-</th>
                      <td className="text-left">-</td>
                      <td className="text-center">$0.00</td>
                      <td className="text-center">0</td>
                      <td className="text-right">$0.00</td>
                    </tr>
                  :
                    <>
                      {lineItems}
                    </>
                  }

                  <tr>
                    <th scope="row" colSpan="4" className="text-right">Total</th>
                    <td className="text-right"><strong>{invoiceTotal}</strong></td>
                  </tr>
                </tbody>
              </Table>

              <div className="form-row">
                <FormGroup className="col-12 text-center">
                  <Button color="success" type="submit">Submit Invoice</Button>
                  &nbsp;&nbsp;
                  <Button color="secondary" outline type="reset" onClick={this.resetForm}>Reset</Button>
                </FormGroup>
              </div>
            </Form>
            
            { this.state.success ? 
              <div className="col-md-12 d-flex justify-content-center">
                <Alert color="success" className="col-md-8">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.toggleSuccess}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  Successfully submitted invoice.
                </Alert >
              </div>
            : null }

            { this.state.error ? 
              <div className="col-md-12 d-flex justify-content-center">
                <Alert color="warning" className="col-md-8">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.toggleError}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  Please check that you have selected a customer and have at least one item in the invoice, thanks!
                </Alert >
              </div>
            : null }

          </Col>
        </Row>
      </Container>
    )
  }
}

export default CreateInvoice;