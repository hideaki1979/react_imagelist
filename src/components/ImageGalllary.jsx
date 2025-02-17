import { ImageCard } from "./ImageCard";

export const ImageGallary = ({ images, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* 画像表示エリア */}
      {images.map((img, index) => (
        <ImageCard key={index} img={img} onDelete={() => onDelete(index)} />
      ))}
    </div>
  );
};
