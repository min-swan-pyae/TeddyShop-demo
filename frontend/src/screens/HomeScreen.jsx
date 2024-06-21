// import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
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

  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <div>error?.data.message</div>
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
        </>
      )}
    </>
  );
};

export default HomeScreen;
