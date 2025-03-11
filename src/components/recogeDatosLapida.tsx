"use client"
import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import Image from "next/image";

declare const cv: any;

const CapturarLápida: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    fechaFallecimiento: ''
  });
  const [fotoDifunto, setFotoDifunto] = useState<string | null>(null);

  // Iniciar cámara
  const iniciarCamara = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error al acceder a la cámara:', err));
  };

  // Capturar y procesar imagen
  const capturarImagen = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Procesar la imagen capturada
      const src = cv.imread(canvas); 
      procesarTexto(src);
      identificarFotoDifunto(src);
    }
  };

  // Función para extraer texto usando Tesseract
  const procesarTexto = (src: any) => {
    const dataUrl = canvasRef.current?.toDataURL(); // Convertir canvas a URL de imagen

    if (dataUrl) {
      Tesseract.recognize(dataUrl, 'spa', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
          console.log('Texto extraído:', text);

          // Proceso básico para extraer campos específicos usando expresiones regulares
          const nombre = text.match(/Nombre: (\w+)/)?.[1] || '';
          const apellidos = text.match(/Apellidos: (\w+)/)?.[1] || '';
          const fechaNacimiento = text.match(/Fecha de Nacimiento: (\d{2}\/\d{2}\/\d{4})/)?.[1] || '';
          const fechaFallecimiento = text.match(/Fecha de Fallecimiento: (\d{2}\/\d{2}\/\d{4})/)?.[1] || '';

          // Actualizar formulario con datos extraídos
          setFormData({ nombre, apellidos, fechaNacimiento, fechaFallecimiento });
        });
    }
  };

  // Identificar y guardar la foto del difunto
  const identificarFotoDifunto = (src: any) => {
    const rect = new cv.Rect(50, 50, 200, 200); // Coordenadas y tamaño aproximados de la región de la foto del difunto
    const fotoRegion = src.roi(rect); // Recorta la región de la foto

    const fotoCanvas = document.createElement('canvas');
    cv.imshow(fotoCanvas, fotoRegion); // Muestra la imagen en un nuevo canvas
    setFotoDifunto(fotoCanvas.toDataURL('image/png')); // Convierte a URL de imagen y guarda

    // Libera memoria
    fotoRegion.delete();
    src.delete();
  };

  React.useEffect(() => {
    iniciarCamara();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
      <button onClick={capturarImagen}>Capturar Imagen</button>

      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>

      <form>
        <div>
          <label>Nombre: <input type="text" value={formData.nombre} readOnly /></label>
        </div>
        <div>
          <label>Apellidos: <input type="text" value={formData.apellidos} readOnly /></label>
        </div>
        <div>
          <label>Fecha de Nacimiento: <input type="text" value={formData.fechaNacimiento} readOnly /></label>
        </div>
        <div>
          <label>Fecha de Fallecimiento: <input type="text" value={formData.fechaFallecimiento} readOnly /></label>
        </div>
      </form>

      {fotoDifunto && <Image src={fotoDifunto} alt="Foto del difunto" />}
    </div>
  );
};

export default CapturarLápida;
