import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Nav } from 'react-bootstrap';
import { Wrapper, Content } from './TabsMenu.styles'
import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';


const TabsMenu = () =>
{

    const [Categories, setCategories] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
        const data = await axios.get("/category");
        setCategories(data);
        }
        fetchCategories();
 
    }, []);

    if (!Categories) return null;

    return (
        <>
        <Wrapper>
        <Content>
        <Card bg='light' border='primary'>
        <Card.Header>
          <Nav variant="tabs" className="justify-content-center">
              <Nav.Link as={Link} to="/allproducts">
                All Products
                </Nav.Link>
            {
                Categories["data"].map(item => {
                    return (
                      <>
                    <Nav.Link as={Link} to={'/'+item.slug}>
                      {item.slug}
                      </Nav.Link>
                    </>
                    )
                })
            }
          </Nav>
        </Card.Header>
      </Card>
      </Content>
      </Wrapper>
      </>
    );
}

export default TabsMenu;