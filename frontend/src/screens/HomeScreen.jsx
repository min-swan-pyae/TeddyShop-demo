// import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from "axios";

const HomeScreen = () => {
  // this is using useEffect
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
              <div className="custom_slider" style={ { "--width": "285px", "--height": "410px", "--quantity": 6 } }>
                <div className="list">
                  { products.map((product,index) => (
                    <Col key={ product._id } sm={ 12 } md={ 6 } lg={ 4 } xl={ 3 } style={{"--position":index+1}} className="item">
                      <Product product={ product } className="img"/>
                    </Col>
                  )) }
                </div>
              </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
