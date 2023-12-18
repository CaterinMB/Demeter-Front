import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useProduct } from '../Context/Product.context.jsx';
import { AiFillDelete } from 'react-icons/ai';

function ViewDetailProduct() {

    const { getProducts, detailP, deleteDetailProduct, CurrentProd } = useProduct();

    useLayoutEffect(() => {
        getProducts();
    }, []);

    const handleDelete = async (detail) => {
        await deleteDetailProduct(detail);
        console.log(detailP); // Verifica si detailP se actualiza correctamente
    };

    const detailsArray = Array.isArray(detailP) ? detailP : [];

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Insumo</th>
                        <th className="text-center">Cantidad</th>
                        {/* <th className="text-center">Acción</th> */}
                    </tr>
                </thead>
                <tbody>
                    {detailsArray.map((detail) => (
                        <tr key={detail.ID_ProductDetail}>
                            <td className="text-center">{detail.Supply ? detail.Supply.Name_Supplies : ''}</td>
                            <td className="text-center">{detail.Lot_ProductDetail} {detail.Supply.measure}</td>
                            {/* <td>
                                <div style={{ display: "flex", alignItems: "center", padding: '3px' }}>
                                    <button
                                        onClick={() => handleDelete(detail)}
                                        className={`ml-1 btn btn-icon btn-danger`}
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ViewDetailProduct