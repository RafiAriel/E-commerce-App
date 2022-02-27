import React from 'react';
import { Link } from 'react-router-dom';
import { Image, CustomDiv } from './Thumb.styles';
import ReactStars from "react-rating-stars-component";

const Thumb = ({ image, name, price, slug }) => {
  return (
  <CustomDiv>
     <div className="textOverImage">
    <div className='detailsProducts'> {name} </div>
    <div className='rating'><ReactStars size={25} value={(price/100) + 2} edit={false}/></div>
    <Link to={'/products/'+slug}>
    <Image src={image} alt='product-thumb'/>
        </Link>
        </div>
    </CustomDiv>
  );
};

export default Thumb;