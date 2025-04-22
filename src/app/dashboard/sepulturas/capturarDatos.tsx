/* "use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function capturarDatos() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setImage(base64Image);

        // Enviar la imagen al backend para preprocesamiento y OCR
        const response = await fetch("/api/process-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image })
        });
        const data = await response.json();
        setText(data.text);
        setAvatar(data.avatar);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => fileInputRef.current?.click()}
      >
        Tomar Foto
      </button>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Lápida" className="w-64 h-auto" />
        </div>
      )}
      {text && (
        <div className="mt-4 p-2 border rounded w-64">
          <h3 className="font-bold">Texto extraído:</h3>
          <p>{text}</p>
        </div>
      )}
      {avatar && (
        <div className="mt-4">
          <h3 className="font-bold">Avatar detectado:</h3>
          <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border" />
        </div>
      )}
    </div>
  );
}
 */