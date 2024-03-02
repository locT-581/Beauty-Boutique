import Search from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../redux/reducers/productSlice";
import { memo } from "react";

function SearchText() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (document.activeElement === document.querySelector("input")) {
        dispatch(getProductsAsync({ search }));
      }
    }, 800);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search, dispatch]);
  return (
    <div className="pr-1 pl-4 py-1 w-[30%] mx-3 transition-all focus-within:w-1/2 flex justify-between border rounded-full">
      <input
        onChange={handleChangeSearch}
        value={search}
        type="text"
        className="w-3/4 outline-none focus:w-full text-black"
      />
      <Search
        fontSize="medium"
        className="w-1/4 text-black opacity-45 cursor-pointer hover:opacity-70"
      />
    </div>
  );
}

export default memo(SearchText);
