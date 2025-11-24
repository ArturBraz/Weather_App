import CustomButton from "./CustomButton";
import { Trash2 } from "lucide-react";

interface WeatherItem {
  id: number;
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  createdAt?: string;
}

interface WeatherListProps {
  items: WeatherItem[];
  onDelete?: (id: number) => void;
}

export default function WeatherList({ items, onDelete }: WeatherListProps) {
  if (!items || items.length === 0) {
    return (
      <p className="text-center text-zinc-400 mt-6">
        Nenhum clima salvo ainda.
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 shadow"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="w-12 h-12"
            />

            <div>
              <p className="text-zinc-50 font-semibold text-lg">
                {item.city} — {item.country}
              </p>

              <p className="text-zinc-400 text-sm">
                {item.description} — {Math.round(item.temperature)}°C
              </p>

              {item.createdAt && (
                <p className="text-zinc-500 text-xs mt-1">
                  {new Date(item.createdAt).toLocaleString("pt-BR")}
                </p>
              )}
            </div>
          </div>

          {/* DELETE BUTTON */}
          {onDelete && (
            <CustomButton variant="delete" onClick={() => onDelete(item.id)}>
              <Trash2 />
            </CustomButton>
          )}
        </li>
      ))}
    </ul>
  );
}
