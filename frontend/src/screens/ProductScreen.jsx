import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  // const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({});

  // // useEffect(() => {
  // //   const fetchProducts = async () => {
  // //     const { data } = await axios.get("/api/products");
  // //     setProducts(data);
  // //   };
  // //   fetchProducts();
  // // }, []);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [productId]);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart"); //using navigate for button
  };

  return (
    <>
      <Link to="/">
        <Button variant="success my-3">
          <FaArrowLeft />
        </Button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
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
                        <strong className="text-success">
                          ${product.price}
                        </strong>
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
                          {product.countInStock > 0
                            ? "In stock"
                            : "Out of stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          {/* By default, <Form.Control /> renders an <input /> element. However, by specifying as="select", you are instructing the component to render a <select /> element instead. */}
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {/* So, Array(10).keys() creates an iterator that goes from 0 to 9, and the spread operator (...) converts this iterator into an array [0,1,2,3,4,5,6,7,8,9] */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col></Col>
                      <Col>
                        <Button
                          className="btn-outline-success"
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
