//function method used, better than instructor

import React from "react";
import ListProduct from "../components/ListProduct";
import AddProduct from "../components/AddProduct";
import { useState } from 'react';

const ProductContainer = () => {

    const [products, setProducts] = useState([]);

    const handleAddProduct = (product) => {
        const newState = [...products, product];
        setProducts(newState);
    }

    return (<>
        <h1>Product Container</h1>
        <AddProduct handleAddProduct={handleAddProduct}/>
        <ListProduct products = {products}/>
    </>);
}

export default ProductContainer;
