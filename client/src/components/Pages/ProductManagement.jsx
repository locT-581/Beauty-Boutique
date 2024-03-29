import { useEffect, useState } from "react";
import EnhancedTable from "../../UI/EnhancedTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmptyProductAsync,
  clearCurrentProduct,
  getProductByIdAsync,
} from "../../redux/reducers/productSlice";
import { useNavigate } from "react-router-dom";

function ProductManagement({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [moveToEdit, setMoveToEdit] = useState(false);
  const { currentProduct } = useSelector((state) => state.productSlice);
  useEffect(() => {
    dispatch(clearCurrentProduct());
  }, []);

  useEffect(() => {
    if (currentProduct.id && moveToEdit) {
      navigate(`/chinhsuasanpham/${currentProduct.id}`);
      setMoveToEdit(false);
    }
  }, [currentProduct, navigate, dispatch, moveToEdit]);

  const handleAddNew = () => {
    console.log("product add new");
    dispatch(addEmptyProductAsync({ name: "Chưa có tên" }));
    setMoveToEdit(true);
  };
  const handleEdit = (id) => {
    dispatch(getProductByIdAsync(id));
    navigate(`/chinhsuasanpham/${id}`);
  };
  return (
    <>
      <h3 className="text-2xl font-semibold px-10">{title}</h3>
      <div className="pr-[5%] ">
        <EnhancedTable handleAddNew={handleAddNew} handleEdit={handleEdit} />
      </div>
    </>
  );
}

export default ProductManagement;
