"Use Client"
import CapturarLápida from "@/components/recogeDatosLapida";
import columns2 from '../../../assets/images/12columns2.svg'
import Image from 'next/image';

export default function ReduccionPage() {
  return (
    <div>
      <h1>REDUCIONES DE RESTOS CADAVÉRICOS</h1>
      {/* <CapturarLápida /> */}
      <Image src={columns2} alt="Fondo"></Image>
    </div>
  );
}
