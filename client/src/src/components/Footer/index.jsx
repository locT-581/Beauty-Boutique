import { Link } from "react-router-dom";
import Logo from "../../UI/Icon/Logo";

function Footer() {
  return (
    <footer className="w-full bg-soft-pink flex justify-between items-center text-black px-[10%] py-7">
      <nav className="w-5/12 flex">
        <ul className="flex w-full justify-between px-[8%]">
          <li className="px-[1%] hover:scale-105 hover:text-pink">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="px-[1%] hover:scale-105 hover:text-pink">
            <Link to="/chu-de">Chủ đề</Link>
          </li>
          <li className="px-[1%] hover:scale-105 hover:text-pink">
            <Link to="/wikiFlower">WikiFlower</Link>
          </li>
          <li className="px-[1%] hover:scale-105 hover:text-pink">
            <Link to="/tin-tuc">Tin tức</Link>
          </li>
          <li className="px-[1%] hover:scale-105 hover:text-pink">
            <a href="#about">Về chúng tôi</a>
          </li>
        </ul>
      </nav>
      <div className="w-2/12 flex justify-center">
        <Logo width="140" />
      </div>
      <div className="w-5/12 text-center flex flex-col">
        <span>© 2024 BEAUTY BOUTIQUE. All rights reserved</span>
      </div>
      <div className="text-sm text-end -mr-[10%]">
        <p>admin@beauty.com</p>
        <p>admin123</p>
      </div>
    </footer>
  );
}

export default Footer;
