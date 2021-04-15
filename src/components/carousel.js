import React from 'react';
import { Nav, Navbar, Form, FormControl,Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router';

export const CarouselApp = () => {
    const history = useHistory();
    
    const navigateTo = (flag)=>{
        //history.push("/product");
        console.log("cebi")
        history.push("/search");
        if( flag){
            history.push("/search/"+flag);
        }
    };
    
  return(
<Carousel style={{height:200}}>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
      alt="First slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
      alt="Second slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
      alt="Third slide"
      style={{height:200}}
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
);}