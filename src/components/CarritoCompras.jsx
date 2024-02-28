import React, { useState } from 'react';

function CarritoCompras({ cartItems }) {
 console.log("itemsCompras"+ cartItems)
  return (
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>{item.product} - Cantidad: </li>
      ))}
    </ul>
  );
}

export default CarritoCompras;