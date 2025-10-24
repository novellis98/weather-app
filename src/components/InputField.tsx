import { AiOutlineArrowRight } from "react-icons/ai";
import AsyncSelect from "react-select/async";
import useData from "../hooks/useData";

interface Props {
  cityName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetch: () => void;
}

function InputField(props: Props) {
  const urlBase = import.meta.env.VITE_API_URL_AUTOCOMPLETE;
  const { autoData, autocomplete } = useData();

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return [];
    const url = `${urlBase}${inputValue}`;
    autocomplete(url);
    if (autoData) {
      return autoData.map((city: any) => ({
        label: city.name,
        value: city.id,
      }));
    }
    return [];
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onFetch();
    }
  };

  return (
    <div className="flex  justify-center gap-2 mt-10 w-60 mx-auto relative">
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        // onChange={props.onChange}
        onChange={(selectedOption: any) => {
          // aggiorna lo stato del parent con il nome città
          props.onChange({
            target: { value: selectedOption?.label },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Insert city name"
        onClick={props.onFetch}
      />

      <button
        className="bg-green-700 rounded-sm py-1 px-4 "
        onClick={props.onFetch}
      >
        <AiOutlineArrowRight className="text-amber-300 " />
      </button>
    </div>
  );
}

export default InputField;
