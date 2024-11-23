import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1728280103627-eae2f0907378?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'woman',
  },
  {
    url: 'https://images.unsplash.com/photo-1728280033356-7980fd75106c?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'another woman',
  },
  {
    url: 'https://images.unsplash.com/photo-1728279978020-a1bad8215e10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'another woman',
  }
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return(
    <div>
      <div className="slider-container">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="slide"
            style={{ opacity: index === current ? 1 : 0, animation: 'none' }}
          >
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
        <button className="nav-button prev" onClick={prevSlide}>
          <ArrowBackIosIcon />
        </button>
        <button className="nav-button next" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <style jsx>{`
        .slider-container {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          animation: fade 15s infinite;
        }

        .slide:nth-child(1) {
          animation-delay: 0s;
        }

        .slide:nth-child(2) {
          animation-delay: 5s;
        }

        .slide:nth-child(3) {
          animation-delay: 10s;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .caption {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1.2rem;
        }

        @keyframes fade {
          0%, 27% {
            opacity: 1;
          }
          33%, 93% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 1rem 0.5rem;
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .prev {
          left: 0;
          border-radius: 0 3px 3px 0;
        }

        .next {
          right: 0;
          border-radius: 3px 0 0 3px;
        }
      `}</style>
    </div>
  )
}