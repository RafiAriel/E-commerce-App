import React, {useContext} from 'react';
import { CustomWrapper } from './Checkout.styles';
import {CartContext} from '../../utils/ObjectContext';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';


const Checkout = () =>
{
let navigate = useNavigate();
const alert = useAlert();
const {currentCart, setCurrentCart} = useContext(CartContext);
let products = [];
let temp = [];


if(currentCart.cart !== undefined)
{
currentCart.cart.forEach(item => { 
  if( !temp[item.slug] ){  
    temp[item.slug] = []; 
  } 
  temp[item.slug].push(item); 
}   
);

for (const [key,value] of Object.entries(temp)) {
 products.push(value);
}

const TotalPrice = (products) =>
{
let sum = 0;
products.map((products) => {
  sum = sum + (products[0].price * products.length);
});
return sum;
};

// navigte to home page 
const goBack = () =>
{
  navigate('/');
};

const clearCart = () =>
{
  setCurrentCart({cart: []});
  alert.success("The cart has been deleted!");
  navigate('/');
}

const clearProduct = (e) =>
{
  let slug = e.target.getAttribute('slug');
  let temp = currentCart.cart;

  temp = temp.filter(function (val) {
    return val["slug"] !== slug;
});

  setCurrentCart({cart: temp})
  
}

return (
<>
<CustomWrapper>
{
  (currentCart.cart.length > 0) ? (
    <> <div className='myCart'> My Cart </div> </>
  ) : <> <img src='/emptycart.png' alt='' width='800px' height='450px'/> <Button variant="dark" onClick={goBack}> Continue Shopping <i className="fas fa-shopping-cart"></i></Button>{' '} </>
}
<br/>
<table>
  <thead>
  {
    (currentCart.cart.length > 0) ? (
      <tr>
      <th>Product</th>
      <th>Image</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Subtotal</th>
      <th>Action</th>
    </tr> 
    ) : <div></div>
  }
  </thead>
  <tbody>
  {
    (currentCart.cart.length > 0) ? (
    products.map((itemsBySlug) => {
      return (
        <>
        <tr>
          <td className='itemName'> {itemsBySlug[0].name} </td>
          <td> <img className="center" src={itemsBySlug[0].image} width='100%;' height='100px' alt=''/> </td>
          <td className='itemName'> {itemsBySlug.length} </td>
          <td className='itemPrice'>{itemsBySlug[0].price}$</td>
          <td className='itemSubTotal'>{itemsBySlug[0].price * itemsBySlug.length}$</td>
          <td> <Button variant="danger" onClick={clearProduct} slug={itemsBySlug[0].slug}> Clear Product</Button> </td>

        </tr>
        </>
      )
    })) : <div></div>
   }
</tbody>
</table>
{
(currentCart.cart.length > 0) ? (
<>
<br/>
<div className='totalPrice'>Total Price: <div className='price'>{TotalPrice(products)}$</div></div>
<br/>
<Button variant="dark" onClick={goBack}> Continue Shopping <i className="fas fa-shopping-cart"></i></Button>{' '}
<Button variant="danger" onClick={clearCart}>Clear Cart</Button>
<br/>
<br/>
</>
) : <div></div>
}
</CustomWrapper>
</>
);
}
}

export default Checkout;
