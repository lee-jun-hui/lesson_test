const ListProduct = (props) => {

    const products = props.products;

    return (
        <>
            <h2>List Product</h2>
            <ul>
                {products.map(p =>
                    <li key={p.id}>
                        {p.product} + {p.price} = {p.result}
                    </li>)}
            </ul>
        </>
    );
};

export default ListProduct;