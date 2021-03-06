import React from 'react';
import { Carousel } from 'react-bootstrap';

export const CarouselApp = () => {
    
    
  return(
<Carousel style={{height:200}}>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://image.shutterstock.com/image-vector/holi-dhamaka-offer-40-75-260nw-1273015360.jpg"
      alt="First slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>{null}</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="https://image.freepik.com/free-vector/holi-sale-header-banner-with-70-discount-offer_1302-21265.jpg"
      alt="Second slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>{null}</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.static-zoutons.com/images/originals/blog/AmazonDiwaliSaleOffers_1534756239_1604661395.jpg"
      alt="Third slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>{null}</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
);}