import AsyncSelect from "react-select/async";
import useData from "../hooks/useData";
import type { City, CityOption } from "../interfaces/interfaces";

interface Props {
  cityName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetch: () => void;
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onFetch();
    }
  };

  return (
    <div className="flex  justify-center gap-2 mt-10 w-72 mx-auto relative">
      <AsyncSelect<CityOption>
        className="w-100"
        loadOptions={loadOptions}
        defaultOptions
        // onChange={props.onChange}
        onChange={(selectedOption: CityOption | null) => {
          props.onChange({
            target: { value: selectedOption?.label },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Insert city name"
      />
    </div>
  );
}

export default InputField;
