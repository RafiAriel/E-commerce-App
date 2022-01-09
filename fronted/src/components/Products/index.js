import Grid from '../Grid';
import CustomGrid from '../CustomGrid';
import Thumb from '../Thumb';
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const ProductsByCat = () => {

    const [ProductsByCat, setProductsByCat] = useState();
    const { category } = useParams();

    useEffect(() => {
        let url = "";
        if(category === undefined)
            url = 'Products/allproducts';
        else
            url = 'Products/'+category;

        const fetchProductsByCat = async () => {
        const data = await axios.get(url);
        setProductsByCat(data);
        }
        fetchProductsByCat();
 
    }, [category]);

    if (!ProductsByCat) return null;
       
    return (
        <>
            <Grid header={category}>
            {
            ProductsByCat["data"].map(item => {
                return (
                    <>
                    <Thumb
                        key={item._id}
                        clickable
                        image={'product_images/'+item._id+'/'+item.image}
                        name={item.title}
                        price={item.price}
                        category={item.category}
                        slug={item.slug}
                    />
                    </>
                    )}
                )
            }
        </Grid>
        </>
    );
}

const Product = () => {

    const { slug } = useParams();

    const [Product, setProduct] = useState();
    useEffect(() => {
        const fetchProduct = async () => {
        const data = await axios.get("/Products/product/"+slug);
        setProduct(data);
        }
        fetchProduct();
 
    }, [slug]);

    if (!Product) return null;
    
    return (
        <>
            <CustomGrid children={Product["data"].p} price={Product["data"].p.price}>
            {
                <> 
                    <Thumb
                        key={Product["data"].p._id}
                        clickable
                        image={'/product_images/'+Product["data"].p._id+'/'+Product["data"].p.image}
                        name={Product["data"].p.title}
                        price={Product["data"].p.price}
                        category={Product["data"].p.category}
                        slug={Product["data"].p.slug}
                    />
                </>
            }
        </CustomGrid>
        </>
    );
}

export { ProductsByCat, Product };