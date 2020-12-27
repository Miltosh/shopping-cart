import React from 'react'

function Filter({ size, data, sort, setSort, products, setProducts, setSize }) {

    const filterProducts = (event) => {
        if (event.target.value === "") {
            setSize(event.target.value)
            setProducts(data.products)
        } else {
            setSize(event.target.value)
            setProducts(data.products.filter(
                (product) => product.availableSizes.indexOf(event.target.value) >= 0
            ),
            )
        }
    }

    const sortProducts = (event) => {
        const sort = event.target.value;

        setSort(sort)
        setProducts(products
            .slice()
            .sort((a, b) =>
                sort === 'lowest'
                    ? a.price > b.price
                        ? 1
                        : -1
                    : sort === 'highest'
                        ? a.price < b.price
                            ? 1
                            : -1
                        : a._id < b._id
                            ? 1
                            : -1
            ))
    }

    return (
        <div className="filter">
            <div className="filter-result">{products.length} Products</div>
            <div className="filter-sort">
                Order{" "}
                <select defaultValue={size} onChange={(e) => sortProducts(e)}>
                    <option value="">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">
                Filter{" "}
                <select defaultValue={size} onChange={(e) => filterProducts(e)}>
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
}

export default Filter
