// components/ImagenUploader.tsx
import React, { ChangeEvent, useState } from 'react';

interface ImagenUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const ImagenUploader: React.FC<ImagenUploaderProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target?.result) {
          setPreview(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label>Imagen:</label>
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="Vista previa" style={{ width: '200px' }} />}
    </div>
  );
};

export default ImagenUploader;
