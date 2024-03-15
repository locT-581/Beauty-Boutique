import { memo, useEffect, useRef, useState } from "react";
import getListFromDB from "../../utils/getListFromDB";

function TextInputWithSuggests({
  name = "nameInput",
  className,
  required = true,
  updateValue,
  ignore = [],
  ...rest
}) {
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(0); // Cursor to select value use for keyboard
  const cursorRef = useRef(0); // Cursor in ref to use in useEffect
  const [suggestList, setSuggestList] = useState([]);
  const suggestListRef = useRef([]);
  useEffect(() => {
    getListFromDB("flowers", { search: value }).then((result) => {
      // Filter out the ignore list
      result = result.filter((element) => !ignore.includes(element.name));
      setSuggestList(result);
    });
  }, []);

  useEffect(() => {
    suggestListRef.current = suggestList;
    if (suggestList.length > 0) {
      document.querySelector(`#suggests`).style.top = `${
        document.querySelector(`input[name='${name}']`).offsetTop +
        document.querySelector(`input[name='${name}']`).offsetHeight +
        10
      }px`;
    }
  }, [suggestList]);

  const submit = (i) => {
    updateValue(suggestListRef.current[i].name, true);
    setValue(suggestListRef.current[i].name);
    setSuggestList([]);
    document
      .querySelector(`input[name='${name}']`)
      .parentElement.querySelector("input[type='number']")
      .focus();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.value.length >= 0 && suggestListRef.current.length > 0) {
        if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          document
            .querySelector(`#tag-${cursorRef.current}`)
            ?.classList.remove("bg-soft-pink");
          submit(cursorRef.current);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setCursor((pre) => {
            document
              .querySelector(`#tag-${pre}`)
              .classList.remove("bg-soft-pink");
            return pre + 1;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setCursor((pre) => {
            document
              .querySelector(`#tag-${pre}`)
              .classList.remove("bg-soft-pink");
            return pre - 1;
          });
        }
      }
    };

    document
      .querySelector(`input[name='${name}']`)
      .addEventListener("keydown", handleKeyDown);

    return () => {
      document
        .querySelector(`input[name='${name}']`)
        ?.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cursorRef.current = cursor;
    if (suggestList.length > 0) {
      if (cursor > suggestList.length - 1) {
        setCursor(0);
        return;
      }
      if (cursor < 0) {
        setCursor(suggestList.length - 1);
        return;
      }
      if (cursor >= 0) {
        const tagSelectedDOM = document.querySelector(`#tag-${cursor}`);
        tagSelectedDOM.classList.add("bg-soft-pink");
      }
    }
  }, [cursor, suggestList]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    updateValue(value);
    const timeout = setTimeout(() => {
      if (value[value.length - 1] === " ") {
        setSuggestList([]);
      } else {
        getListFromDB("flowers", { search: value }).then((result) => {
          // Filter out the ignore list
          result = result.filter((element) => !ignore.includes(element.name));
          setSuggestList(result);
        });
      }
    }, 200);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <input
        title=" "
        onChange={handleOnChange}
        value={value}
        className={className}
        type="text"
        name={name}
        required={required}
        autoComplete="off"
        {...rest}
      />
      {suggestList.length > 0 && (
        <div
          id="suggests"
          className="absolute z-50 bg-white w-[200px] rounded-[10px] shadow-lg"
        >
          {suggestList.map((element, i) => (
            <p
              onClick={() => {
                submit(i);
              }}
              id={`tag-${i}`}
              key={i}
              className="w-full text-start px-3 py-2 cursor-pointer hover:bg-soft-pink transition-all duration-200 ease-in-out"
            >
              {element.name}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default memo(TextInputWithSuggests);
