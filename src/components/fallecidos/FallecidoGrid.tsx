import { SimpleFallecido } from "../interfaces/simpleFallecido";
import { FallecidoCard } from "./FallecidoCard";

interface Props {
  fallecidos: SimpleFallecido[];
  onToggleFavorite: (id: number, newFavorite: boolean) => void;
}

export const FallecidoGrid = ({ fallecidos, onToggleFavorite }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      {fallecidos.map((fallecido) => (
        <div className="flex flex-col items-center" key={fallecido.id}>
          <FallecidoCard fallecidos={fallecido} onToggleFavorite={onToggleFavorite} />
        </div>
      ))}
    </div>
  );
};