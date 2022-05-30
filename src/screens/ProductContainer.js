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
        <h1>Sum of Two Numbers!!!</h1>
        <Enterhere numbers here handleAddProduct={handleAddProduct}/>
        <ListResults products = {products}/>
    </>);
}

export default ProductContainer;
