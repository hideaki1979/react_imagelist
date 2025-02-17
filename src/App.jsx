import { useState, useEffect } from "react";
import "./App.css";
import { ImageUploader } from "./components/ImageUploader";
import { ImageGallary } from "./components/ImageGalllary";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    try {
      const imageList = JSON.parse(localStorage.getItem("images")) || [];
      setImages(imageList);
    } catch (error) {
      console.error("ローカルストレージの画像取得時エラー：", error);
      setImages([]);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images, reader.result];
        setImages(newImages);
        // LocalStorageに保存
        try {
          localStorage.setItem("images", JSON.stringify(newImages));
        } catch (error) {
          console.error("ローカルストレージへの画像保存時エラー：", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    try {
      localStorage.setItem("images", JSON.stringify(newImages));
    } catch (error) {
      console.error("ローカルストレージへの画像保存時エラー：", error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-200">
        <main className="flex-1 p-4 mb-20">
          <header className="p-4 ">
            <h1 className="text-3xl font-bold text-center mb-4">
              画像ギャラリー
            </h1>
            <ImageUploader onUpload={handleUpload} />
          </header>
          <section>
            <ImageGallary images={images} onDelete={handleDelete} />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
