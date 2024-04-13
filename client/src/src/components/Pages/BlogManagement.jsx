import { useNavigate } from "react-router-dom";
import EnhancedTable from "../../UI/EnhancedTable";
import { useDispatch, useSelector } from "react-redux";
import { addEmptyBlog, clearCurrentBlog } from "../../redux/reducers/blogSlice";
import { useEffect, useState } from "react";

function BlogManagement({ title }) {
  const { currentBlog } = useSelector((state) => state.blogSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [moveToEdit, setMoveToEdit] = useState(false);

  useEffect(() => {
    dispatch(clearCurrentBlog());
  }, [dispatch]);

  useEffect(() => {
    if (currentBlog.id && moveToEdit)
      navigate(`/chinhsuabaiviet/${currentBlog.id}`);
  }, [currentBlog, navigate, dispatch, moveToEdit]);

  const handleAddNew = () => {
    dispatch(addEmptyBlog({ title: "Chưa có tiêu đề" }));
    setMoveToEdit(true);
  };

  const handleEdit = (id) => {
    navigate(`/chinhsuabaiviet/${id}`);
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

export default BlogManagement;
