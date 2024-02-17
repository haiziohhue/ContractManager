import { useState } from "react";
import { getFiles } from "../api/axios";

export const Search = ({ set }:{set:React.Dispatch<React.SetStateAction<EntityContract[]>>}) => {
  const [searchValue, setSearchValue] = useState("");
  const style = {
    marginLeft: "10px",
  };

  const handleSearchInputChange = (e:any) => {
    setSearchValue(e.target.value);
  };
  const getData = (e:any) => {
    e.preventDefault();
    getFiles({
        context:searchValue??undefined
    }).then((res) => {
      set(res.data.data);
      setSearchValue("");
    });
  };
  const reset = () => {
    setSearchValue("");
    getFiles({}).then((res) => {
      set(res.data.data);
    });
  };
  return (
    <>
      <form onSubmit={getData}>
        <label>
          搜索：
          <input
            name="search"
            type="text"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </label>
        <label>
          <input type="submit" value="搜索" style={style} />
        </label>
        <label>
          <input type="button" value="重置" onClick={reset} style={style} />
        </label>
      </form>
    </>
  );
};
