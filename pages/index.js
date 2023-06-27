import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const HomePage = () => {
  const [images, setImages] = useState([]);

  const handleAddImage = async () => {
    try {
      const response = await fetch(
        'https://api.unsplash.com/photos/random?count=1',
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newImages = data.map((image) => image.urls.regular);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } else {
        // Handle non-successful response
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteImage = () => {
    if (images.length === 0) {
      alert('No images to delete!');
      return;
    }

    setImages((prevImages) => prevImages.slice(0, -1));
  };

  const handleDeleteAll = () => {
    if (images.length === 0) {
      alert('No images to delete!');
      return;
    }

    setImages([]);
  };

  return (
    <div>
      <button onClick={handleAddImage}>Add Image</button>
      <button onClick={handleDeleteImage}>Delete Image</button>
      <button onClick={handleDeleteAll}>Delete All</button>

      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={` ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
