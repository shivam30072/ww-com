"use client";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./Home.module.css";
import axios from "axios";
const BASE_URL = process.env.BACKEND_BASE_URL;
interface SliderImage {
  url: string; // URL of the image
  type: string; // Type of the image (e.g., "homepage")
  id: string; // Unique identifier for the image
}

// Define an interface for the expected response structure
interface SliderImageResponse {
  results: SliderImage[]; // Array of slider images
  page: number; // Current page number
  limit: number; // Limit of results per page
  totalPages: number; // Total number of pages available
  totalResults: number; // Total number of results available
}

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<SliderImage[]>([]);

  const fetchSliderImages = async () => {
    let sliderImages = localStorage.getItem("SliderImages");

    if (sliderImages) {
      const images = JSON.parse(sliderImages);
      setImages(images);
      return images;
    }
    try {
      const response = await axios.get<SliderImageResponse>(
        `${BASE_URL}/v1/slider`
      );
      const results = response.data.results || [];

      localStorage.setItem("SliderImages", JSON.stringify(results));
      setImages(results);

      return results;
    } catch (error) {
      console.error("Error fetching slider images:", error);
      return []; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

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

  if (!images) {
    return <div> No data found </div>;
  }

  return (
    <div>
      <div className={styles.sliderContainer}>
        {images.map((image: SliderImage, index) => (
          <div
            key={image.id}
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
