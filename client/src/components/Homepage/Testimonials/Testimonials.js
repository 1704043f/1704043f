import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container
} from 'reactstrap';
const img1 = require('../../../img/testimonial4.jpg')
const img2 = require('../../../img/testimonial5.jpg')
const img3 = require('../../../img/testimonial3.jpg')
const items = [
    {
        src: {img2},
        altText: 'Testimonial 1',
        caption: 'Since we integrated MedMonitor into our clinical trial, we see positive outcome at patient well-being!'
    },
    {
        src: {img1},
        altText: 'Testimonial 2',
        caption: 'I have never missed another dose of medication ever since I started using MedMonitor! This application helps '
    },
    {
        src: { img3},
        altText: 'Testimonial 3',
        caption: 'One word, two thumbs, AWESOME APP!!'
    }
];

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            console.log(item.src);
            console.log(Object.values(item.src));
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={Object.values(item.src)}
                >
                    <img src={Object.values(item.src)} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <Container fluid id='testimonials' className='home-section text-center'>
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
            </Container>
        );
    }
}


export default Example;