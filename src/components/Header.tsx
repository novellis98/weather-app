import { LuAlignJustify } from "react-icons/lu";
import { WiDayFog } from "react-icons/wi";

function Header() {
  return (
    <div className="relative h-10 flex justify-center items-center px-4">
      <div className="flex items-center space-x-2">
        <WiDayFog className="text-amber-300 text-xl" />
        <h1 className="text-amber-300 uppercase text-xl font-bold">
          Weather app
        </h1>
      </div>

      <div>
        <LuAlignJustify className="absolute right-4 top-3 text-amber-300 text-xl" />
      </div>
    </div>
  );
}

export default Header;
