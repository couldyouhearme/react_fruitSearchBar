import React, { useState } from 'react'

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

export const SearchBar = () => {
    const [filterVal, setFilterVal] = useState('')
    const [inStock, setInStock] = useState(false)

    return (
        <>
            <FilterableProductTable filterVal={filterVal} setFilterVal={setFilterVal} inStock={inStock} setInStock={setInStock} />
            <br />
            <ProductTable products={PRODUCTS} filterVal={filterVal} inStock={inStock} />
        </>
    )
}

export const FilterableProductTable = ({ filterVal, setFilterVal, inStock, setInStock }) => {

    return (
        <div>
            <input type='text' placeholder='Search...' value={filterVal} onChange={e => setFilterVal(e.target.value)} />
            <div>
                <label>
                    <input type='checkbox' checked={inStock} onChange={e => setInStock(e.target.checked)}></input>
                    {' '}Only show products in stock
                </label>
            </div>
        </div>
    )
}

export const ProductTable = ({ products, filterVal, inStock }) => {
    return (
        <table>
            <thead><tr><th>Name</th><th>Price</th></tr></thead>
            <ProductCategoryRow products={products} filterVal={filterVal} inStock={inStock} />
        </table>
    )
}

export const ProductCategoryRow = ({ products, filterVal, inStock }) => {
    return (
        <>
            <thead><tr><th>Fruits</th></tr></thead>
            <ProductRow products={products} category={'Fruits'} filterVal={filterVal} inStock={inStock} />
            <thead><tr><th>Vegetables</th></tr></thead>
            <ProductRow products={products} category={'Vegetables'} filterVal={filterVal} inStock={inStock} />
        </>
    )
}

export const ProductRow = ({ products, category, filterVal, inStock }) => {
    let filter = filterVal.trim().toLowerCase()
    return products.map((product, idx) => {
        if (product.category === category && (filter === '' || product.name.toLowerCase().indexOf(filter) !== -1) && (inStock ? product.stocked === true : true)) {
            return (
                <tbody>
                    <tr key={idx} >
                        <td style={{ color: product.stocked ? 'green' : 'red' }}>{product.name}</td>
                        <td>{product.price}</td>
                    </tr>
                </tbody>
            )
        }
    })
}
