import { useEffect, useState } from "react";
import CustomButton from "./components/CustomButton";
import CustomInput from "./components/CustomInput";
import WeatherList from "./components/WeatherList";
import WeatherPreview from "./components/WeatherPreview";
import Wrapper from "./components/Wrapper";

function App() {
  // const itemsMock = [
  //   {
  //     id: 1,
  //     city: "São Paulo",
  //     temperature: 22,
  //     description: "Céu limpo",
  //     icon: "01d",
  //     createdAt: "2025-11-23",
  //   },
  //   {
  //     id: 2,
  //     city: "Rio de Janeiro",
  //     temperature: 28,
  //     description: "Parcialmente nublado",
  //     icon: "02d",
  //   },
  // ];

  interface PreviewWeather {
  city: string
  country: string
  temperature: number
  description: string
  icon: string
}

interface WeatherLog {
  id: number;
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  createdAt?: string;
}
  const [previewWeather, setPreviewWeather] = useState<PreviewWeather | null>(null);
  const [city, setCity] = useState("");
  const [items, setItems] = useState<WeatherLog[]>([]);

  // 1. GET → Buscar clima externo
  async function fetchLogs() {
    try {
      const response = await fetch("http://localhost:3333/api/weather/logs");
      const data = await response.json();
      setItems(data); // salva os itens no estado
    } catch (err) {
      console.error("Erro ao buscar logs:", err);
    }
  }
  // Carrega assim que o componente monta
  useEffect(() => {
    async function load() {
      await fetchLogs();
    }
    load();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3333/api/weather?city=${city}`
      );
      const data = await response.json();

      setPreviewWeather({
        city: data.city,
        country: data.country,
        temperature: data.temperature,
        description: data.description,
        icon: data.icon,
      });
    } catch (err) {
      console.error("Erro ao buscar clima:", err);
    }
  }

  //POST
  async function handleSave() {
    if (!previewWeather) return;

    try {
      const response = await fetch("http://localhost:3333/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(previewWeather),
      });

      if (response.ok) {
        await fetchLogs(); // 🔥 atualiza a lista após salvar
      }
    } catch (err) {
      console.error("Erro ao salvar no banco:", err);
    }
  }
  //DELETE
  async function handleDelete(id: number | string) {
    try {
      await fetch(`http://localhost:3333/api/weather/${id}`, {
        method: "DELETE",
      });

      // Atualiza lista local sem precisar de outro GET
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  }

  return (
    <>
      <Wrapper className="py-6">
        <h1 className="flex justify-center text-3xl font-poppins dark:text-white">
          Weather App
        </h1>

        <div className="flex flex-col justify-center gap-3">
          <WeatherPreview data={previewWeather} />
          <form className="flex items-end gap-1.5" onSubmit={handleSearch}>
            <CustomInput
              className="text-zinc-50"
              label="Cidade"
              placeholder="Digite uma cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <CustomButton className="" variant="search" type="submit">
              Buscar
            </CustomButton>
            <CustomButton className="" variant="save" onClick={handleSave}>
              Salvar
            </CustomButton>
          </form>
        </div>

        <div id="weatherList" className="">
          <WeatherList onDelete={handleDelete} items={items} />
        </div>
      </Wrapper>
    </>
  );
}

export default App;
