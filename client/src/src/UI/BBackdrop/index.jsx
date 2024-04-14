import { Backdrop } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop } from "../../redux/reducers/uiSlice";

function BBackdrop({ children }) {
  const dispatch = useDispatch();
  const { isShowBackDrop } = useSelector((state) => state.uiSlice);
  const backdropRef = useRef(null);
  const childRef = useRef(null);
  const handleClickBackdrop = (e) => {
    if (!childRef.current.children[0].contains(e.target)) {
      dispatch(closeBackDrop());
    }
  };
  return (
    <Backdrop
      onClick={handleClickBackdrop}
      ref={backdropRef}
      transitionDuration={{ appear: 100, enter: 0, exit: 300 }}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1501,
      }}
      open={isShowBackDrop}
    >
      <div ref={childRef}> {children}</div>
    </Backdrop>
  );
}

export default BBackdrop;
