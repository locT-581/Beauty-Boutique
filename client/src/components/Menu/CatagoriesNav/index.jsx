import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


function CatagoriesNav({ className = "", ...rest }) {
  const { pathname } = useLocation();
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
            pathname === "/tat-ca-san-pham"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          Tất cả
        </li>
        <li
          className={
            pathname === ""
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
        Đối tượng
        </li>
        <li
          className={
            pathname === "/chu-de"
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
        <Link to="/chu-de">Chủ đề</Link>
        </li>
        <li
          className={
            pathname === ""
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          }
        >
          Hoa tươi
        </li>
        <li
          className={
            pathname === ""
              ? "border-b-2 border-b-yellow "
              : "" +
                "cursor-pointer hover:text-yellow hover:border-b-2 hover:border-b-yellow transition-all duration-75 px-1"
          } 
        >
          Màu sắc
        </li>
      </ul>
    </nav>
  );
}

export default CatagoriesNav;
