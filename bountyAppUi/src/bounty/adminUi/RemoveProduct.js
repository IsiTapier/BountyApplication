import React from 'react';
import ProductSelect from '../util/ProductSelect';
import { removeProduct } from '../util/Database';
import { Button } from 'react-bootstrap';

export default function RemoveProduct() {

    function run(product) {
        if(window.confirm("Remove Product "+product.name+" ("+product.price+"€) ?")) {
            console.log(`Remove Product: ${product.name} (${product.price}€)`);
            removeProduct(product);
        }
    }

    return(
        <div className='rubric'>
            <div className='title'>{"Remove Product"}</div>
            <ProductSelect runCallback={run} useReset={true} useSubmit={true} resetSubmit={true} hideReset={true} hideSubmit={true} />
        </div>
    );
}