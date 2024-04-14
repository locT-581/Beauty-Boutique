import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button";
import { Tooltip } from "@mui/material";

function CatagoriesNav({ className = "", handleActiveTab, ...rest }) {
  const [tabActive, setTabActive] = useState({ root: "all", sub: null });

  const handleClick = (tag, sub) => {
    setTabActive(() => {
      handleActiveTab({ root: tag, sub });
      return { root: tag, sub };
    });
  };
  return (
    <nav
      className={
        "w-full flex flex-col items-center justify-center text-base uppercase font-medium my-4 " +
        className
      }
      {...rest}
    >
      <ul className="w-1/2 flex justify-around border-b-2 py-2">
        <li
          className={
            tabActive.root === "all"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
          id="all"
          onClick={() => {
            handleClick("all");
          }}
        >
          Tất cả
        </li>
        <li
          className={
            tabActive.root === "object"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          <Tooltip
            disableFocusListener
            disableTouchListener
            title={
              <div className="w-52 flex flex-col bg-white text-black py-1">
                <Button
                  onClick={() => handleClick("object", "birthday")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
                >
                  Sinh nhật
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("object", "grandOpening")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Khai trương
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("object", "love")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Tình yêu
                </Button>
                <Button
                  onClick={() => handleClick("object", "congratulation")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Chúc mừng
                </Button>
              </div>
            }
          >
            Chủ đề
          </Tooltip>
        </li>
        <li
          className={
            tabActive.root === "topic"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          Đối tượng
        </li>
        <li
          className={
            tabActive.root === "flower"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
          id="flower"
          onClick={() => {
            handleClick("flower");
          }}
        >
          Hoa tươi
        </li>
        <li
          className={
            tabActive.root === "color"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
          id="color"
          onClick={() => {
            handleClick("color");
          }}
        >
          Màu sắc
        </li>
      </ul>
    </nav>
  );
}

export default CatagoriesNav;
