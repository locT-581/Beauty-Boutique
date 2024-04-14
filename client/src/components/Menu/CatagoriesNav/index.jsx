import { useState } from "react";
import Button from "../../../UI/Button";
import { Tooltip } from "@mui/material";

function CatagoriesNav({ className = "", handleActiveTab, ...rest }) {
  const [tabActive, setTabActive] = useState({ root: "all", sub: null });

  const [showSubMenuTopic, setShowSubMenuTopic] = useState(false);
  const [showSubMenuFlower, setShowSubMenuFlower] = useState(false);
  const [showSubMenuColor, setShowSubMenuColor] = useState(false);

  const handleOpenTopic = () => {
    setShowSubMenuTopic(true);
  };

  const handleCloseTopic = () => {
    setShowSubMenuTopic(false);
  };

  const handleClick = (tag, sub) => {
    setTabActive(() => {
      handleActiveTab({ root: tag, sub });
      return { root: tag, sub };
    });
    setShowSubMenuTopic(false);
    setShowSubMenuFlower(false);
    setShowSubMenuColor(false);
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
            tabActive.root === "topic"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          <Tooltip
            open={showSubMenuTopic}
            onClose={handleCloseTopic}
            onOpen={handleOpenTopic}
            className="cursor-pointer"
            disableFocusListener
            disableTouchListener
            title={
              <div className="w-52 flex flex-col bg-white text-black py-1">
                <Button
                  onClick={() => handleClick("topic", "birthday")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
                >
                  Sinh nhật
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("topic", "grandOpening")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Khai trương
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("topic", "love")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Tình yêu
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("topic", "congratulation")}
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
            tabActive.root === "flower"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          <Tooltip
            open={showSubMenuFlower}
            onClose={() => setShowSubMenuFlower(false)}
            onOpen={() => setShowSubMenuFlower(true)}
            className="cursor-pointer"
            disableFocusListener
            disableTouchListener
            title={
              <div className="w-52 flex flex-col bg-white text-black py-1">
                <Button
                  onClick={() => handleClick("flower", "RkpfCocSqkUrGWFCBXPD")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
                >
                  Hoa cúc
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("flower", "Mke7bPuQCuHghCAvg7cJ")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Hoa Tulip
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("flower", "Ofvvl31OvOJ6Twi4ORt4")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Hoa hướng dương
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("flower", "k6XNU6KaxTQD6C5Kck1v")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Hoa hồng
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("flower", "ngJ6YYqLC91nHvrRUXBG")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Hoa bồ công anh
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("flower", "all")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Tất cả
                </Button>
              </div>
            }
          >
            Hoa tươi
          </Tooltip>
        </li>
        <li
          className={
            tabActive.root === "color"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          <Tooltip
            open={showSubMenuColor}
            onClose={() => setShowSubMenuColor(false)}
            onOpen={() => setShowSubMenuColor(true)}
            className="cursor-pointer"
            disableFocusListener
            disableTouchListener
            title={
              <div className="w-52 flex flex-col bg-white text-black py-1">
                <Button
                  onClick={() => handleClick("color", "pink")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
                >
                  Hồng
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("color", "red")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Đỏ
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("color", "yellow")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Vàng
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("color", "white")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Trắng
                </Button>
                <hr />
                <Button
                  onClick={() => handleClick("color", "combine")}
                  color="white"
                  className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
                >
                  Kết hợp
                </Button>
              </div>
            }
          >
            Màu sắc
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}

export default CatagoriesNav;
