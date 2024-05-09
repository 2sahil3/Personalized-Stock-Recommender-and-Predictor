import Layout from "../components/layouts/Layout";
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import MidTerm from '../pages/Recommendation/MidTerm.js'
import ShortTerm from '../pages/Recommendation/ShortTerm.js'
import LongTerm from '../pages/Recommendation/LongTerm.js'


const Recommendation = () =>{

    const [activeCategory, setActiveCategory] = useState('component1');

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

    return(
        <Layout>
            
    <div>
      <Nav variant="tabs" defaultActiveKey="component1">
        <Nav.Item>
          <Nav.Link eventKey="component1" onClick={() => handleCategorySelect('component1')}>
            Short Term
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="component2" onClick={() => handleCategorySelect('component2')}>
            Mid Term
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="component3" onClick={() => handleCategorySelect('component3')}>
            Long Term
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-3">
        {activeCategory === 'component1' && <ShortTerm />}
        {activeCategory === 'component2' && <MidTerm />}
        {activeCategory === 'component3' && <LongTerm />}
      </div>
    </div>
        </Layout>
    );

}

export default Recommendation;