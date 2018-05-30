import React from 'react';
import Carousel from 'nuka-carousel';

<Carousel
  key={type}
  className="field carousel"
  cellAlign="center"
  slideWidth={0.4}
  cellSpacing={350}
  afterSlide={handleSlideChange}
>
  <img src={`http://placehold.it/500x600/ffffff/d3d3d3/&text=Choose+Your+${type}`}/>
  {cases.map(part =>
    <div
      className="parts-info"
      key={part._id}>
      <img
        src={`${part.image}`}
      />
      <p>{part.name}</p>
    </div>
  )}
</Carousel>
