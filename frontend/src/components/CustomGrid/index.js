import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import {UserContext, CartContext} from '../../utils/ObjectContext';
import { CustomWrapper, CustomContent } from './CustomGrid.styles';
import { useAlert } from 'react-alert';

const CustomGrid = ({children , price}) => {

    const alert = useAlert();
    const {currentUser} = useContext(UserContext);
    const {currentCart, setCurrentCart} = useContext(CartContext);

    const addItem = async (e) => {
      e.preventDefault();
      currentCart.cart.push(children.props.children.props);
      setCurrentCart({cart: currentCart.cart});
      alert.success("The product was added to the cart!");

  };

    return (
        <>
        <CustomWrapper>
            {children} 
            <br/> <br/>
            <CustomContent> <div className='priceCustomGrid'>Price: {price}$ </div> </CustomContent>
            <br/>
            { !(Object.keys(currentUser.user).length > 1) ? 
            <CustomContent><div className='msg'>You must be logged in to purchase items</div></CustomContent>
            : <div>
                <Form>
                <Button variant="secondary" onClick={addItem} value= 'add to cart'>
                   <div className='btn'> Add To Cart</div>
                </Button>
                </Form>

            </div> 
        }
        </CustomWrapper>
        </>
        );

    };

CustomGrid.propTypes = {
  header: PropTypes.string
};

export default CustomGrid;