export const ImageUploader = ({ onUpload }) => {
  return (
    // 画像アップロードコンポーネント
    <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg cursor-pointer inline-block items-center">
      画像アップロード
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onUpload}
      />
    </label>
  );
};
