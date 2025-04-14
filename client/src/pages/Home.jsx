import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  return (
    <div 
        className="d-block mx-auto"
        style={{ width: '70%', height: '30%' }}
    > 
      <Carousel>
      <Carousel.Item interval={2000}>
        <img
            className="d-block mx-auto"
            src="/news.jpg" 
            alt="First Slide"
            style={{ width: '60%', height: 'auto' }}
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#F6DCAC', padding: '1rem', borderRadius: '8px' }}>
          <h3>Today is...</h3>
          <p>Learn what famous musician's birthday is.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
            className="d-block mx-auto"
            src="/musicians.jpg" 
            alt="Second Slide"
            style={{ width: '60%', height: 'auto' }}
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#F6DCAC', padding: '1rem', borderRadius: '8px' }}>
          <h3> Musicians Quotes</h3>
          <p>What would this famous musician says?</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
            className="d-block mx-auto"
            src="/flutist.jpg" 
            alt="Third Slide"
            style={{ width: '60%', height: 'auto' }}
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#F6DCAC', padding: '1rem', borderRadius: '8px' }}>
          <h3>Flutist that you should know</h3>
          <p>A little introduction to flutist that you may or not know.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
            className="d-block mx-auto"
            src="/composers.jpg" 
            alt="Fourth Slide"
            style={{ width: '60%', height: 'auto' }}
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#F6DCAC', padding: '1rem', borderRadius: '8px' }}>
          <h3>Behind the Score</h3>
          <p>Discover comments and analysis about some famous compositions.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
  )
}


    