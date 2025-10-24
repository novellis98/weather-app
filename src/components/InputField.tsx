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
    const data = await autocomplete(url);
    console.log(data);
    return data;
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onFetch();
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10 w-52 mx-auto relative">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={(selectedOption: any) => {
          // aggiornare l'input con la città selezionata
          props.onChange({
            target: { value: selectedOption?.label },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Inserisci nome città"
      />

      <button
        className="bg-green-700 rounded-sm py-1 px-1.5 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={props.onFetch}
      >
        <AiOutlineArrowRight className="text-amber-300 " />
      </button>
    </div>
  );
}

export default InputField;
