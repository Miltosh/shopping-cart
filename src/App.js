//feature 1
import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
import store from './store.js';
import { Provider } from "react-redux";

function App() {

  const useLocalStorageList = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);

    return [value, setValue];
  };


  const [products, setProducts] = useState(data.products); // контент всех ячеек выносим в state
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useLocalStorageList('CartItems', [])
  const [showCheckout, setShowCheckout] = useState(false);

  console.log(products)
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                data={data}
                size={size}
                setSize={setSize}
                products={products}
                setProducts={setProducts}
                sort={sort}
                setSort={setSort}
              />
              <Products
                products={products}
                cartItems={cartItems}
                setCartItems={setCartItems}
                store={store}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                showCheckout={showCheckout}
                setShowCheckout={setShowCheckout}
              />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
      </footer>
      </div>
    </Provider>
  );
}

export default App;