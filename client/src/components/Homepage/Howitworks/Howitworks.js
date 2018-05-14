import React from "react";
import { Container, Row, Col } from 'reactstrap';

import HowitworksFull from '../../../img/HowitworksFull.PNG'
import HowitworksMobile from '../../../img/HowitworksMobile.PNG'


const Howitworks = ({ children }) => (

     <div fluid className='home-how'> 
        <br />
        <h1 className="text-center">How it works</h1>
        <br />
             <div className="how-box" >
                <img src={HowitworksFull} className="how-image"/>
                <img src={HowitworksMobile} className="how-image"/> 
             </div>
        <br />
           
    </div>
    
);

export default Howitworks;
