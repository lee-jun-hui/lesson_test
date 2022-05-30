import { useState } from 'react';

const AddProduct = (props) => {

    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");

    const onProductChange = (e) => {
        setProduct(e.target.value)
    };
    const onPriceChange = (e) => {
        setPrice(e.target.value)
    };

    const getRandomId = (max) => {
        return Math.floor(Math.random() * max);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            product: product,
            price: price,
            result: parseInt(product) + parseInt(price),
            id: getRandomId(1000)
        }
        console.log(newProduct);
        props.handleAddProduct(newProduct);

    }

    return (
        <>
            <h3>Add Product</h3>
            <form onSubmit={handleOnSubmit}>
                <input type="number" value={product} onChange=
                    {onProductChange} />
                +
                <input type="number" value={price} onChange=
                    {onPriceChange} />
                <button disabled={!product || !price}>Add</button>
            </form>
        </>
    );
};

export default AddProduct;