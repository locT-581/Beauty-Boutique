import Footer from "../Footer";
import Header from "../Header";

function DefaultLayout({ children }) {
  return (
    <div className="w-full">
      <Header className="bg-pink py-6" />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
