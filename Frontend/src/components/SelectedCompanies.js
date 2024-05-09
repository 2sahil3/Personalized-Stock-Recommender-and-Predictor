import React from "react";
import { Nav,Modal,Form } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useState,useEffect } from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "./Auth/AuthContext";


const SelectedCompanies = ({topStocks,onCompanyClick}) =>{
  const { user } = useAuth();
  // console.log(topStocks);
  const [selectedItem, setSelectedItem] = useState(null);
  const [companyData,setCompanydata] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [ifBuy,setIfBuy] = useState(null);
  const handleClick = (item) => {
      setSelectedItem(item);
      onCompanyClick(item.stock);
    };
    
    const handleBuyButton = (e,item) =>{
      setIfBuy(true);
      setSelectedStock(item);
      setShowModal(true);
    }
    
    const handleSellButton = (e,item) =>{
      setSelectedStock(item);
      setIfBuy(false);
      setShowModal(true);
    }
    const handleClose = () => {
      setShowModal(false);
      setSelectedStock(null);
      setQuantity('');
      setIfBuy(null);
    };
  
    const handleConfirm = async () => {
      // Implement logic to handle the quantity input and perform buy/sell operation
      // console.log(selectedItem);
      if(ifBuy==null){
        console.log("ERROR: Buy or sell not mentioned! contact developer!")
      }
      if(ifBuy){
        console.log(`Buying ${quantity} stocks of ${selectedStock.stock}`);
        const response = await axios.post('http://localhost:5000/api/stock/buy',{username:user.username,symbol:selectedItem.stock,quantity:quantity});
        console.log(response);
      }
      else if(ifBuy === false)
      {
        console.log(`Selling ${quantity} stocks of ${selectedStock.stock}`);
        const response = await axios.post('http://localhost:5000/api/stock/sell',{username:user.username,symbol:selectedItem.stock,quantity:quantity});
        console.log(response);
      }
      
      handleClose();
    };
  
  return (
<>
<ListGroup as="ol" numbered>
        {topStocks.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleClick(item)}
            className="d-flex justify-content-between align-items-start "
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.stock}</div>
              {130}
            </div>
            <div className="d-flex align-items-center">
        <Button
          variant="success"
          className="me-2"
          onClick={(e) => handleBuyButton(e, item)}
        >
          Buy
        </Button>
        <Button
          variant="danger"
          className="me-3"
          onClick={(e) => handleSellButton(e, item)}
        >
          Sell
        </Button>
      </div>
            <Badge bg="primary" pill>
              {item.value}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStock && selectedStock.stock}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current Quantity in Portfolio: {selectedStock && selectedStock.quantity}</p>
          <Form.Group controlId="quantityInput">
            <Form.Label>Enter Quantity:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      
      </>
  );
}
export default SelectedCompanies;
