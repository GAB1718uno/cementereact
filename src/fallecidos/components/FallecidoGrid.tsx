import { FallecidoCard, SimpleFallecido } from "..";

interface Props {
  fallecidos: SimpleFallecido[];
}

export const FallecidoGrid = ({ fallecidos }: Props) => {
  return (
    <div className=" flex flex-wrap gap-3 items-center justify-center">
      {fallecidos.map((fallecido) => (
          <div className=" flex flex-col items-center" key={ fallecido.id}>
            <FallecidoCard fallecidos={fallecido} />
          </div>
        
      ))}
    </div>
  );
};
