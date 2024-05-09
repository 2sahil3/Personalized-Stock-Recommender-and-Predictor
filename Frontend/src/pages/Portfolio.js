import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col ,Modal,Form} from 'react-bootstrap';
import { useAuth } from "../components/Auth/AuthContext.js";
import Layout from "../components/layouts/Layout.js"

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [investmentValue, setInvestmentValue] = useState(0);
    const [liquidValue, setLiquidValue] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [selectedStock, setSelectedStock] = useState(null);
    const [ifBuy,setIfBuy] = useState(null);

    const {user} = useAuth();


    useEffect(() => {
        // Replace with your actual API endpoint
        axios.get('http://localhost:5000/api/user/portfolio',{params:{username:user.username}})
            .then(response => {
                console.log(response);
                setPortfolio(response.data.portfolio);
                setInvestmentValue();
                setLiquidValue();
                
                // Calculate investment and liquid values here
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    const handleBuyButton = (stock) => {
        setIfBuy(true);
        setSelectedStock(stock);
        console.log(stock);
        setShowModal(true);
    };

    const handleSellButton = (stock) => {
        setIfBuy(false);
        setSelectedStock(stock);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setQuantity('');
        setIfBuy(null);
    };

    const handleConfirm = async () => {
        // Implement logic to handle the quantity input and perform buy/sell operation
        // console.log(selectedItem);
        try {
            
        if(ifBuy==null){
          console.log("ERROR: Buy or sell not mentioned! contact developer!")
        }
        if(ifBuy){
          console.log(`Buying ${quantity} stocks of ${selectedStock.symbol}`);
          const response = await axios.post('http://localhost:5000/api/stock/buy',{username:user.username,symbol:selectedStock.symbol,quantity:quantity});
          console.log(response);
        }
        else if(ifBuy === false)
        {
          console.log(`Selling ${quantity} stocks of ${selectedStock.stock}`);
          const response = await axios.post('http://localhost:5000/api/stock/sell',{username:user.username,symbol:selectedStock.symbol,quantity:quantity});
          console.log(response);
        }
    } catch (error) {
        console.log("error in buy/sell");
           console.log(error) ;
    }
        
        handleClose();
      };


    return (
        <Layout>
        <Container>
            <Row>
                <Col><h3>Investment Value: {investmentValue}</h3></Col>
                <Col><h3>Liquid Value: {liquidValue}</h3></Col>
                <Col><h3>Total Portfolio Value: {investmentValue + liquidValue}</h3></Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>Quantity</th>
                        <th>average buy price</th>
                        <th>LTP</th>
                        <th>Returns</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolio.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.symbol}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.avgPrice}</td>
                            <td>{stock.ltp}</td>
                            <td>{stock.returns}</td>
                            <td>
                                <Button variant="success" onClick={() => handleBuyButton(stock)}>Buy</Button>{' '}
                                <Button variant="danger" onClick={() => handleSellButton(stock)}>Sell</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

        <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStock && selectedStock.symbol}</Modal.Title>
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


        </Layout>
    );
};

export default Portfolio;
