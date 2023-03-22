/*
Pseudocode:

1. Create a React component named Gallery that will display a list of images fetched from Firebase Storage.
2. Include the Firebase Storage SDK in the project to enable communication with Firebase Storage.
3. Create a firebaseConfig file with the Firebase credentials and initialize Firebase in the app using the firebaseConfig file.
4. Create a Firebase Storage reference and create a function to get all image URLs from Firebase Storage.
5. Fetch the image URLs using the Firebase Storage reference and store them in an array.
6. Use the map function to display each image URL in the array as an image on the gallery page.

    Code:
```tsx

*/
import React, { useState, useEffect } from 'react';
import stora
const Gallery: React.FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('images');
        const imageUrlsArray: string[] = [];

        await imagesRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then((url) => {
                    imageUrlsArray.push(url);
                });
            });
        });

        setImageUrls(imageUrlsArray);
    };

    return (
        <div>
            {imageUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Image ${index} `} />
            ))}
        </div>
    );
};

export default Gallery;
```