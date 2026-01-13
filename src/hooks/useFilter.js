import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useFilter() {
  // hooks
  const router = useRouter();
  const { query } = router;
  const { color, size, fabric, occasion, pattern, styles, priceRange } = query;

  // state
  const [short, setShort] = useState("");
  const [colorName, setcolorName] = useState("red");

  const [filters, setFilters] = useState({
    color: "",
    size: "",
    price: "",
    fabric: "",
    occasion: "",
    pattern: "",
    style: "",
    priceRange: "",
  });

  // methods
  const handleSetFilter = (type, value) => {
      setFilters((prevObject) => ({
          ...prevObject,  // Copy the previous state
          [type]: value, // Update the specific key with the new value
        }))
  };

  const getUrlParmas = () => {
    color !=undefined && handleSetFilter("color",color)
    size  !=undefined && handleSetFilter("size", size)
    fabric !=undefined && handleSetFilter("fabric", fabric)
    occasion !=undefined && handleSetFilter("occasion", occasion)
    pattern !=undefined && handleSetFilter("pattern", pattern)
    styles !=undefined && handleSetFilter("style", styles)
  };

//   useEffect(() => {
//     console.log(filters);
//   }, [filters])
  

  return {
    colorName,
    getUrlParmas,
  };
}
