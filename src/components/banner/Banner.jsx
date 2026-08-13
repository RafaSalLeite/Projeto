// Crie este componente – por exemplo em src/components/BannerCarousel.jsx

import React from 'react';
import { Carousel } from 'primereact/carousel';
import './Banner.css';

export default function Banner() {
  const banners = [
    { src: './Banner1.png', alt: 'Banner 1' },
    { src: './Banner2.png', alt: 'Banner 2' },
    { src: './Banner3.png', alt: 'Banner 3' },
  ];

  const itemTemplate = (item) => {
    return (
      <div className="banner-item">
        <img 
          src={item.src} 
          alt={item.alt} 
          className="banner-image" 
        />
      </div>
    );
  };

  return (
    <div className="banner-carousel-container">
      <Carousel 
        value={banners} 
        itemTemplate={itemTemplate} 
        numVisible={1} 
        numScroll={1} 
        circular 
        autoplayInterval={3000}  // rola a cada 3s
          showIndicators={false} 
          showNavigators={false}        // opcional: esconder setas
      />
    </div>
  );
}
