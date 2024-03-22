import Footer from "../Footer";
import Header from "../Header";
import CatagoriesNav from "../Menu/CatagoriesNav";

function DefaultLayout({ children }) {
  return (
    <div className="w-full">
      <Header className="bg-pink py-6" />
      <CatagoriesNav className=" mt-4 " />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
