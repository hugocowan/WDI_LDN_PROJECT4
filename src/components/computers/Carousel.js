import React from 'react';
import Carousel from 'nuka-carousel';

import Decimals from '../../lib/Decimals';



const FormCarousel = ({ parts, computer, type, handleSlideChange }) => {

  const sizes = [ 'Mini-ITX', 'Micro-ATX',
    'ATX', 'E-ATX'
  ];

  const chipsets =[ 'X79', 'Z87', 'Z97',
    'FM2+', 'AM3+', 'X99', 'Z170', 'X299',
    'Z270', 'Z370', 'Z390', 'AM4', 'X399'
  ];

  if(!computer.case) return null;
  return (
    <Carousel
      key={type}
      className="field carousel"
      afterSlide={index => handleSlideChange(index, type)}
      renderBottomCenterControls={() => {}}
    >

      {computer[type.toLowerCase()] &&
        <div className="parts-info" style={{
          height: '350px'
        }}>
          <p>
            {computer[type.toLowerCase()].name}{computer[type.toLowerCase()].size &&
            `: ${sizes[computer[type.toLowerCase()].size]}`}
            {computer[type.toLowerCase()].chipset &&
            ` ${chipsets[computer[type.toLowerCase()].chipset]}`}
            {computer[type.toLowerCase()].name &&
            `, ${Decimals.calculate(computer[type.toLowerCase()].price)}`}
          </p>
          <img
            className="carousel-starter-image"
            src={computer[type.toLowerCase()].image || `http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+${type}`}
          />
        </div>}

      {parts.filter((part) => part.type === type).map(part =>
        <div
          className="parts-info"
          key={part._id}>

          <p>
            {part.ramType ? `${part.ramType}: ${part.name} - ${part.speed}MHz, ${Decimals.calculate(part.price)}` :
              part.size && part.chipset ? `${sizes[part.size]} ||
            ${chipsets[part.chipset]}:  ${part.name},  ${Decimals.calculate(part.price)}` :
                part.size && !part.chipset ? `${sizes[part.size]}: ${part.name},  ${Decimals.calculate(part.price)}` :
                  part.chipset ? `${chipsets[part.chipset]}: ${part.name},  ${Decimals.calculate(part.price)}` :
                    part.storageType ? `${part.storageType}: ${part.name},  ${Decimals.calculate(part.price)}`:
                      `${part.name},  ${Decimals.calculate(part.price)}`}
          </p>
          <img
            src={`${part.image}`}
          />

        </div>
      )}

    </Carousel>
  );
};

export default FormCarousel;
