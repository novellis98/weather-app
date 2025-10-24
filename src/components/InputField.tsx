import { AiOutlineArrowRight } from "react-icons/ai";
import AsyncSelect from "react-select/async";
import useData from "../hooks/useData";

interface Props {
  cityName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetch: () => void;
}

function InputField(props: Props) {
  const { autoData, autoLoading, autoError, autocomplete } = useData();

  // funzione che react-select usa per caricare le opzioni
  const loadOptions = async (inputValue: string, callback: any) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    await autocomplete(inputValue); // chiama la tua funzione che fetcha i dati
    if (autoData) {
      // mappa i dati ricevuti in opzioni compatibili con react-select
      const options = autoData.map((city: any) => ({
        label: city.name,
        value: city.id,
      }));
      callback(options);
    }
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
