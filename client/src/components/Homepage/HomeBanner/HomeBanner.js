import React from 'react';
import { Jumbotron, Button } from 'reactstrap';


const HomeBanner = (props) => {
    return (

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

    );
};

export default HomeBanner;