import { useState } from "react";
import styles from "./events-slider.module.scss";

interface EventsSliderProps {
  images: string[];
}

function EventsSlider({ images }: EventsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className={styles.noImages}>No Secondary Images</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.prevButton} onClick={handlePrev}>
        ❮
      </button>
      <div className={styles.slider}>
        <div
          className={styles.slidesWrapper}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image}
                alt={`Event Image ${index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        ❯
      </button>
    </div>
  );
}

export default EventsSlider;
