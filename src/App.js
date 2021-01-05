import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from './store.js';
import { Provider } from "react-redux";

function App() {

  const [showCheckout, setShowCheckout] = useState(false);

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
                store={store}
              />
              <Products
                store={store}
              />
            </div>
            <div className="sidebar">
              <Cart
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