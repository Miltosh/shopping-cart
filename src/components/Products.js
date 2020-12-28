import React from 'react'

function Products({ products, cartItems, setCartItems }) {

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

    return (
        <div>
            <ul className="products">
                {products.map(product => (
                    <li key={product._id}>
                        <div className="product">
                            <a href={"#" + product._id}>
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
            </ul>
        </div>
    )
}

export default Products
