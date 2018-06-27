import React from 'react';


export default class HomeNav extends React.Component {
      
    onToggle(event) {
        console.log("burgertoggle")
        let links = document.querySelector('.narrowLinks');

        if (links.style.display === 'block') {
            links.style.display = 'none';
        } else {
            links.style.display = 'block';
        }
    }

    render() {
        return (
            <nav fluid class='heading'>
				<div className="navWide">
					<div className="wideDiv">
                        <a href="#">Home</a>
						<a href="#mission">Mission</a>
						<a href="#benefits">Benefits</a>
                        <a href="#aboutus">About Us</a>
                        <a href="#futureplans">Future Plans</a>
                        <a href="#contact">Contact</a>
					</div>
				</div>

				<div className="navNarrow">
                <div onClick={(event) => this.onToggle(event)}>
                    <div className="nav-menu-icon">menu</div>
                </div>
                    <div className="narrowLinks">       
                        <a href="#">Home</a>
						<a href="#mission">Mission</a>
						<a href="#benefits">Benefits</a>
                        <a href="#aboutus">About</a>
                        <a href="#futureplans">Future Plans</a>
                        <a href="#contact">Contact</a>
					</div>
				</div>
                
			</nav>
        )

    }
}