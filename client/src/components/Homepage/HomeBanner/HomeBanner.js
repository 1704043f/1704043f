import React from 'react';
import { Jumbotron, Button } from 'reactstrap';


const HomeBanner = (props) => {
    return (

        <div>

            <Jumbotron fluid className="jumbo">
                <div className="jumbo-text">
                    <h1 className="jumbo-title">MedMonitor</h1>
                    <hr />
                    <p className="jumbo-tagline">Targeted data analytics to improve patient care</p>
                    <hr />
                    <p className="jumbo-button">
                    <Button href="/discover" className="bttn" color="primary" size="md">Discover More</Button>
                    </p>
                </div>
            </Jumbotron>

            <div className="jumbo-text-mobile">
                <h1 className="jumbo-title-mobile">MedMonitor</h1>
                <p className="jumbo-tagline-mobile">Targeted data analytics to improve patient care</p>
                
                <p className="jumbo-button-mobile">
                    <Button href="/discover" className="bttn" color="primary" size="md">Discover More</Button>
                    <br />
                </p>
            </div>



        </div>

    );
};

export default HomeBanner;