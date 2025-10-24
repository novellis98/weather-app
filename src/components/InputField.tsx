import { AiOutlineArrowRight } from "react-icons/ai";
import useData from "../hooks/useData";
interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityName: string;
  onFetch: () => void;
}

function InputField(props: Props) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      props.onFetch();
    }
  }
  const { autoData, autoLoading, autoError, autocomplete } = useData();
  return (
    <div className="flex justify-center mt-10 bg-blue-100  w-52 mx-auto rounded-2xl  items-center relative ">
      <input
        type="text"
        id="cityName"
        className="bg-blue-100 rounded-md"
        placeholder="Inserisci nome città"
        onChange={props.onChange}
        value={props.cityName}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-green-700 rounded-sm py-1 px-1.5 absolute right-0 z-10"
        onClick={props.onFetch}
      >
        <AiOutlineArrowRight className="text-amber-300 " />
      </button>
    </div>
  );
}

export default InputField;
