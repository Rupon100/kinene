import React from 'react';
import SingleProduct from './SingleProduct';
 
const Products = ({ products }) => {

    console.log(products)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
            {
                products?.map((pro, index) => (
                    <SingleProduct key={index} product={pro} ></SingleProduct>
                ))
            }
        </div>
    );
};

export default Products;