import React from 'react'
import { filterProducts, sortProducts } from '../actions/productActions';
import { connect } from 'react-redux';

function Filter({ size, sort, products, filteredProducts, store }) {

    return (
        !filterProducts ? (<div>Loading...</div>)
            : (
                <div className="filter">
                    <div className="filter-result"> {!filteredProducts ? 'Products is Loading...' : `${filteredProducts.length} Products`} </div>
                    <div className="filter-sort">
                        Order{" "}
                        <select defaultValue={sort} onChange={(e) => store.dispatch(sortProducts(filteredProducts, e.target.value))}>
                            <option value="latest">Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <div className="filter-size">
                        Filter{" "}
                        <select defaultValue={size} onChange={(e) => store.dispatch(filterProducts(products, e.target.value))}>
                            <option value="">ALL</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                </div>
            )
    )
}

export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);
