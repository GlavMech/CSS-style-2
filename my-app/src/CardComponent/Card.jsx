import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';

export const Card = () => {
  const [active, setActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const loadNewImage = async () => {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=1`);
      const data = await response.json();
      const img = data[0];
      setImageUrl(`https://picsum.photos/id/${img.id}/500/400`);
      setAuthor(img.author);
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
  };

  useEffect(() => {
    loadNewImage();
  }, []);

  // Динамичные классы для изменения фона и цвета текста
  const cardClasses = active ? styles.activeCard : styles.inactiveCard;
  const textClasses = active ? styles.activeText : styles.inactiveText;
  const buttonClasses = active ? styles.activeButton : styles.inactiveButton;

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${cardClasses}`}>
        <div className={styles.selectedImageContainer}>
          {imageUrl && <img src={imageUrl} className={styles.image} alt="Selected" />}
        </div>
        <div className={styles.content}>
          <h2 className={textClasses}>Image Gallery</h2>
          <p className={textClasses}>Author: <span>{author || 'Unknown'}</span></p>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${buttonClasses}`}
            onClick={loadNewImage}
          >
            NEW
          </button>
          <button
            className={`${styles.button} ${buttonClasses}`}
            onClick={() => setActive(!active)}
          >
            Переключить тему
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
