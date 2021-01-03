import React, { useState, useEffect } from 'react';
import { Slide, Zoom } from "react-awesome-reveal"
import Modal from 'react-modal';
//import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
//import { productsReducer } from '../reducers/productReducers'

Modal.setAppElement('#root')

function Products({ store, products, cartItems, setCartItems }) {

    useEffect(() => {
        store.dispatch(fetchProducts())
    })
    const [product, setProduct] = useState(null);

    const addToCart = (product) => {
        const itemsCart = cartItems.slice();
        let alreadyInCart = false;

        itemsCart.forEach(item => {
            if (item._id === product._id) {

                item.count++;
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            itemsCart.push({ ...product, count: 1 });
            alreadyInCart = true;
        }
        setCartItems(itemsCart)
        localStorage.setItem("CartItems", JSON.stringify(itemsCart))
    }

    const openModal = (product) => {
        setProduct(product)
    }

    // const closeModal = () => {
    //     setProduct(null)
    // }

    return (
        <div>
            <Slide direction="up" cascade triggerOnce duration='500'>
                {
                    !products
                        ? (<div>Loading...</div>)
                        :
                        (<ul className="products">
                            {products.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => openModal(product)}>
                                            <img src={product.image} alt={product.title} />
                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <div>${product.price}</div>
                                            <button onClick={() => addToCart(product)} className='button primary'>Add To Cart</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>)
                }

            </Slide>
            {
                product && (
                    <Modal
                        isOpen={true}
                    //ariaHideApp={false}
                    >
                        <Zoom triggerOnce>
                            <button className="close-modal" onClick={() => setProduct(null)}>X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Avaiable Sizes: {" "}
                                        {product.availableSizes.map(x => (
                                            <span key={product._id}> {" "} <button className="button">{x}</button></span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div><strong>${product.price.toFixed(1)}</strong></div>
                                        <button className="button primary" onClick={() => {
                                            addToCart(product);
                                            setProduct(null);
                                        }}>Add To Cart</button>

                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )
            }
        </div >
    )
}

export default Products

// export default connect((state) => ({ products: state.products.items }), {
//     fetchProducts,
// })(Products);