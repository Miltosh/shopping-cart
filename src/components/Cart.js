import React, { useState } from 'react';
import { Slide, Zoom } from "react-awesome-reveal"
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderAction'

function Cart({ order, cartItems, clearOrder, createOrder, removeFromCart, showCheckout, setShowCheckout }) {


    const [formItems, setFormItems] = useState({
        Email: '',
        Name: '',
        Address: ''
    });

    const makeOrder = (e) => {
        e.preventDefault();
        console.log(order)
        order = { ...formItems, cartItems: [...cartItems], total: cartItems.reduce((a, c) => a + c.price * c.count, 0) }
        createOrder(order)
        console.log(order)
    }

    const handleInput = (e) => {
        setFormItems({ ...formItems, [e.target.name]: e.target.value })
    }

    const closeModal = () => {
        clearOrder()
    }

    return (
        <div>
            {cartItems.length === 0
                ? <div className="cart cart-header">Cart is empty</div>
                : <div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>
            }

            {
                order &&
                <Modal
                    isOpen={true}
                    onRequestClose={() => closeModal()}>
                    <Zoom>
                        <button className="close-modal" onClick={() => closeModal()}>x</button>
                        <div className="order-details">
                            <h3 className="success-message">
                                Your order has been placed.
                            </h3>
                            <h2>Order number {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    {console.log(order)}
                                    <div>{order.Name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.Email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order.Address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{order.total}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>{order.cartItems.map(x => (
                                        <div key={x._id}>
                                            {x.count} {" x "} {x.title}
                                        </div>
                                    ))}</div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            }

            <div>
                <div className="cart">
                    <Slide cascade triggerOnce direction='left' duration='500'>
                        <ul className="cart-items">
                            {cartItems.map((item) => (

                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {`$${item.price} x ${item.count} `}
                                            <button className="button" onClick={() => removeFromCart(item)}>Remove</button>
                                        </div>

                                    </div>
                                </li>

                            ))}
                        </ul>
                    </Slide>
                </div>
                {cartItems.length > 0
                    ? <div className="cart">
                        <div className="total">
                            <div> Total: {" "}
                                {`$${(cartItems.reduce((a, c) => a + (c.price * c.count), 0)).toFixed(1)}`}
                            </div>
                            <button onClick={() => setShowCheckout(true)} className="button primary">
                                Proceed
                        </button>
                        </div>
                    </div>
                    : null
                }
                {showCheckout && (
                    <Slide direction='right' cascade={false} triggerOnce duration='700'>
                        <div className="cart">
                            <form onSubmit={(e) => makeOrder(e)}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name='Email' type="email" required onChange={(e) => handleInput(e)} />
                                        { }
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input name='Name' type="text" required onChange={(e) => handleInput(e)} />
                                    </li>
                                    <li>
                                        <label>Addres</label>
                                        <input name='Address' type="text" required onChange={(e) => handleInput(e)} />
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">
                                            Checkout
                                    </button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </Slide>
                )}
            </div >
        </div >
    )
}

export default connect((state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
}),
    { removeFromCart, createOrder, clearOrder }
)(Cart);
