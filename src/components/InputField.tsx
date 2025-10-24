import AsyncSelect from "react-select/async";
import useData from "../hooks/useData";
import type { City, CityOption } from "../interfaces/interfaces";

interface Props {
  cityName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetch: (city?: string) => void;
}

function InputField(props: Props) {
  const urlBase = import.meta.env.VITE_API_URL_AUTOCOMPLETE;
  const { autocomplete } = useData();

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return [];
    const url = `${urlBase}${inputValue}`;
    try {
      const res = await autocomplete(url);
      return res.map((city: City) => ({
        label: city.name,
        value: city.id,
      }));
    } catch {
      return [];
    }
  };
  return (
    <div className="flex  justify-center gap-2 mt-10 w-72 mx-auto relative">
      <AsyncSelect<CityOption>
        className="w-100"
        loadOptions={loadOptions}
        defaultOptions
        onChange={(selectedOption: CityOption | null) => {
          if (!selectedOption) return;
          props.onChange({
            target: { value: selectedOption.label },
          } as React.ChangeEvent<HTMLInputElement>);
          props.onFetch(selectedOption.label);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onFetch();
          }
        }}
        placeholder="Insert city name"
      />
    </div>
  );
}

export default InputField;
