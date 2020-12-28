import React, { useState } from 'react'

function Cart({ cartItems, setCartItems, showCheckout, setShowCheckout }) {

    const removeFromCart = (product) => {
        const itemsCart = cartItems.slice();
        setCartItems(itemsCart.filter(x => x._id !== product._id))
        localStorage.setItem("CartItems", JSON.stringify(itemsCart.filter(x => x._id !== product._id)))
    }

    const [formItems, setFormItems] = useState({
        Email: '',
        Name: '',
        Address: ''
    });

    const createOrder = (e) => {
        e.preventDefault();
        const order = { ...formItems, ...cartItems }
        alert("Need to save order form " + order.Name)
    }

    const handleInput = (e) => {
        setFormItems({ ...formItems, [e.target.name]: e.target.value })
        console.log(formItems)
    }

    return (
        <div>
            {cartItems.length === 0
                ? <div className="cart cart-header">Cart is empty</div>
                : <div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>
            }
            <div>
                <div className="cart">
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
                    <div className="cart">
                        <form onSubmit={(e) => createOrder(e)}>
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
                )}
            </div >
        </div >
    )
}

export default Cart
