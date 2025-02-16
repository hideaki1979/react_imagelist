import { useState, useEffect } from "react";
import "./App.css";

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
          if (images.length > 0) {
            localStorage.setItem("images", JSON.stringify(newImages));
          }
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
            <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg cursor-pointer inline-block items-center">
              画像アップロード
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
          </header>
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {/* 画像表示エリア */}
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    className="w-full h-full object-contain rounded shadow-lg bg-white"
                    alt="アップロードされた画像ファイル"
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-1 right-1 bg-red-500/70 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
