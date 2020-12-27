//feature 1
import React, { useState } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

function App() {

  const [products, setProducts] = useState(data.products); // контент всех ячеек выносим в state
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");


  return (
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
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>
        All right is reserved.
      </footer>
    </div>
  );
}

export default App;
