
interface WeatherPreviewProps {
  data: {
    city: string;
    temperature: number;
    description: string;
    icon: string; // ex: "01d"
  } | null;
}

export default function WeatherPreview({ data }: WeatherPreviewProps) {
  if (!data) {
    return null; // Não renderiza nada se não tem resultado
  }

  return (
    <div className="w-full flex items-center gap-4 p-4 mt-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow">
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="w-16 h-16"
      />

      <div>
        <p className="text-zinc-50 text-xl font-semibold">{data.city}</p>
        <p className="text-zinc-400 text-sm">
          {data.description} — {data.temperature}°C
        </p>
      </div>
    </div>
  );
}
