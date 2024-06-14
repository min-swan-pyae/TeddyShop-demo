import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div>
      <Link to="/">
        <Button variant="success my-3">
          <FaArrowLeft />
        </Button>
      </Link>
      {/* <Link to={`/product/${Number(productId) + 1}`} className="float-end">
        {productId < products.length && (
          <Button variant="success my-3">
            <FaArrowRight />
          </Button>
        )}
      </Link> */}
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-success">{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className="text-success">Description</h4>{" "}
              <p>{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`Total Reviews: ${product.numReviews}`}
              />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>
                    <strong className="text-success">${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    <strong className="text-success">
                      {product.countInStock > 0 ? "In stock" : "Out of stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>
                    <strong className="text-success">
                      {product.countInStock}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col></Col>
                  <Col>
                    <Button
                      className="btn-outline-success"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
