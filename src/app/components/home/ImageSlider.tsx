"use client";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./Home.module.css";
import axios from "axios"
const BASE_URL = process.env.BACKEND_BASE_URL

// const images = [
//   {
//     url: "https://cdn.shopify.com/s/files/1/0597/5592/1540/files/6-different-styles_1024x1024.jpg?v=1687584397",
//     alt: "woman",
//   },
//   {
//     url: "https://imgmedia.lbb.in/media/2023/08/64e74bb7657e506338faa8c9_1692879799068.jpg",
//     alt: "another woman",
//   },
//   {
//     url: "https://www.biba.in/on/demandware.static/-/Library-Sites-BibaSharedLibrary/default/dw217f4de8/images/blog-image/Amazing-Ethnic-Wear-for-Women-You-can-Gift!.jpg",
//     alt: "another woman",
//   },
// ];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);

  const fetchSliderImages = async() => {
    let sliderImages = localStorage.getItem("SliderImages");

    if(sliderImages){
      const images =  JSON.parse(sliderImages);
      setImages(images);
      return images;
    }
    sliderImages = await axios.get(`${BASE_URL}/v1/slider`)
    localStorage.setItem("SliderImages", JSON.stringify(sliderImages.data.results))
    setImages(sliderImages.data.results)

    return sliderImages
  }

  useEffect(() => {
    fetchSliderImages();
  }, [])

  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [length]);

  if(!images){
    return <div> No data found </div>
  }

  return (
    <div>
      <div className={styles.sliderContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <img src={image.url} alt={"Product Slider images"} />
          </div>
        ))}
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={prevSlide}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
