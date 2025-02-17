export const ImageCard = ({ img, index, onDelete }) => {
  return (
    <div key={index} className="relative">
      <img
        src={img}
        className="w-full h-full object-contain rounded shadow-lg bg-white"
        alt="アップロードされた画像ファイル"
      />
      <button
        onClick={() => onDelete(index)}
        className="absolute top-1 right-1 bg-red-500/70 text-white px-2 py-1 rounded cursor-pointer"
      >
        削除
      </button>
    </div>
  );
};
