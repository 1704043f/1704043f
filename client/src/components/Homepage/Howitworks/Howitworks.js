import React from "react";
import { Container, Row, Col } from 'reactstrap';

import HowitworksFull2 from '../../../img/HowitworksFull2.PNG'


const Howitworks = ({ children }) => (

     <div fluid className='home-how'> 
        <br />
        <h1 className="text-center">How it works</h1>
        <br />



                    <div className="how-box" >
                            <img src={HowitworksFull2} className="how-image"/>
                        </div>
                

        <br />
           
    </div>
    
);

export default Howitworks;
