import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";


const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<{ src: string; text: string }[]>([
    { src: "/images/image1.jpg", text: "Case 1: Successful Case of Infertility" },
    { src: "/images/image2.jpg", text: "Case 2:Successful Case of Hypo Thyroidism" },
    { src: "/images/image3.jpg", text: "Case 3: Successful Case of Infertility" },
    { src: "/images/image4.jpg", text: "Case 4: Successful Case of High CRP" },
    { src: "/images/image5.jpg", text: "Case 5: Successful Case of Diabetes" },
    { src: "/images/image6.jpg", text: "Case 6: Successful Case of Skin Disease" },
    { src: "/images/image7.jpg", text: "Case 7: Successful Case of Alopecia (Hair Fall)" },
    { src: "/images/image8.jpg", text: "Case 8: Successful Case of Infertility" },
    { src: "/images/image9.jpg", text: "Case 9: Successful Case of Mucocele" },
    { src: "/images/image10.jpg", text: "Case 10: Successful Case of Alopecia (Hair Fall)" },
    { src: "/images/image11.jpg", text: "Case 11: Successful Case of Infertility" },
    { src: "/images/image12.jpg", text: "Case 12: Successful Case of Hemorrhagic cyst" },
    { src: "/images/image13.jpg", text: "Case 13: Successful Case of Leucoderma" },
  ]);

  const addImage = () => {
    const newImage = prompt("Enter image file name (inside public/images folder):");
    const newText = prompt("Enter a description for the image:");
    if (newImage && newText) {
      setImages([...images, { src: `/images/${newImage}`, text: newText }]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Successful Cases</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-2 flex flex-col items-center">
              <img src={image.src} alt={`Image ${index}`} className="w-full h-auto rounded-lg" />
              <p className="mt-2 text-center text-sm font-semibold">{image.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
