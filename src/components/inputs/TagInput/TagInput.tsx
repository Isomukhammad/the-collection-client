import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import { useTheme } from "@/context/ThemeContext.tsx";

import { ITag } from "@/types";
import { baseAxios } from "@/utils/axios";
import { debounce } from "@/utils/debounce";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#343a40",
    borderColor: "#343a40",
    color: "white",
    "&:hover": {
      borderColor: "#343a40",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#343a40",
    color: "white",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#007bff33" : "#343a40",
    color: "white !important",
  }),
};

const TagInput = (): JSX.Element => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const fetchData = async (name?: string) => {
    if (!name) return;
    const data = await baseAxios
      .get<{ data: ITag[] }>(`/tags?quantity=5`)
      .then((res) => res.data.data.map((tag) => ({ value: String(tag.id), label: tag.name })));
    setOptions(data);
  };

  const debouncedFetchData = debounce(fetchData, 500);

  const handleOnInputChange = (inputValue: string) => {
    if (!inputValue) {
      setSelectedOption(null);
      setTimeout(() => setOptions([]), 300);
      return;
    }
    debouncedFetchData(inputValue);
  };

  return (
    <div className="App">
      <CreatableSelect
        isMulti
        defaultValue={selectedOption}
        onInputChange={handleOnInputChange}
        options={options}
        styles={theme === "dark" ? customStyles : {}}
        classNamePrefix={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default TagInput;
