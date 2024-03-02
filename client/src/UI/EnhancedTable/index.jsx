import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  deleteManyProductsAsync,
  getAllProductAsync,
  updateProductAsync,
} from "../../redux/reducers/productSlice";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import toastConfig from "../../config/toastConfig";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Button from "../Button";
import AddIcon from "@mui/icons-material/Add";
import SearchText from "../Search";
import BAlertDialog from "../BAlertDialog";

function descendingComparator(a, b, orderBy) {
  const first = a[orderBy];
  const second = b[orderBy];
  if (typeof first === "object" && typeof second === "object") {
    if (first[Object.keys(first)[0]] < second[Object.keys(second)[0]]) {
      return -1;
    }
    if (first[Object.keys(first)[0]] > second[Object.keys(second)[0]]) {
      return 1;
    }
  } else {
    if (second < first) {
      return -1;
    }
    if (second > first) {
      return 1;
    }
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "product",
    label: "Sản phẩm",
  },
  {
    id: "displayMode",
    label: "Hiển thị",
  },
  {
    id: "createAt",
    label: "Ngày tạo",
  },
  {
    id: "stock",
    label: "Tồn kho",
  },
  {
    id: "price",
    label: "Giá bán",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              id="createSortHandler"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className="font-semibold"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDeleteSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Đã chọn
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <BAlertDialog
          title="Xác nhận xóa các mục đã chọn!"
          handleSubmit={handleDeleteSelected}
        >
          <DeleteIcon />
        </BAlertDialog>
      ) : (
        <div className="w-full flex justify-end">
          <div className="w-1/2 flex justify-end ">
            <SearchText />
            <Button className="px-4 mx-2">
              Tạo mới
              <AddIcon />
            </Button>
          </div>
        </div>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const dispatch = useDispatch();
  const { products, error, message } = useSelector(
    (state) => state.productSlice
  );
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createAt");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState([]);
  const modes = useRef([]);

  const getDisplayMode = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        "/api/v1/product/get-display-mode",
        config
      );
      modes.current = data.displayMode;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, toastConfig);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, toastConfig);
      dispatch(clearMessage());
      dispatch(getAllProductAsync());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    getDisplayMode();
    dispatch(getAllProductAsync());
  }, [dispatch]);

  useEffect(() => {
    setRows(
      products.map((product) => ({
        id: product.id,
        product: {
          name: product.name,
          avatar: product.avatar,
          description: product.description,
        },
        displayMode: product.displayMode,
        createAt: product.timestamp._seconds,
        stock: product.stock,
        price: product.price,
      }))
    );
  }, [products]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleChangeDisplayMode = (event, id) => {
    dispatch(updateProductAsync({ id, displayMode: event.target.value }));
  };

  const handleDeleteSelected = async () => {
    await dispatch(deleteManyProductsAsync({ ids: selected }));
    setSelected([]);
  };

  const editProduct = (id) => {
    console.log(id);
  };

  const quickDeleteAProduct = (id) => {
    console.log(id);
  };

  const [focusInput, setFocusInput] = useState(null);
  const [stock, setStock] = useState(0);
  const handleFocusInput = (id) => {
    setFocusInput(id);
    setStock(rows.find((row) => row.id === id).stock);
  };
  useEffect(() => {
    if (focusInput) {
      document.getElementById(focusInput).focus();
    }
  }, [focusInput]);

  const handleChangeStockValue = (event) => {
    if (Number(event.target.value) < 0)
      return toast.error("Số lượng không hợp lệ", toastConfig);
    // Check if not a number
    if (isNaN(Number(event.target.value)))
      return toast.error("Số lượng không hợp lệ", toastConfig);

    setStock(Number(event.target.value));
  };

  const handleSubmitChangeStock = async (id) => {
    await dispatch(updateProductAsync({ id, stock: Number(stock) }));
    setFocusInput(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteSelected={handleDeleteSelected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                // Change timestamp to date

                const date = new Date(row.createAt * 1000);
                const formattedDate = `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="w-full flex py-2">
                        {row.product.avatar && (
                          <img
                            src={row.product.avatar}
                            alt={row.product.name}
                            className="w-[10%] mx-3  object-cover aspect-square"
                          />
                        )}
                        <div>
                          <p className="font-semibold">
                            {
                              // Truncate name
                              row.product.name.length > 50
                                ? `${row.product.name
                                    .substring(0, 50)
                                    .toUpperCase()}...`
                                : row.product.name.toUpperCase()
                            }
                          </p>
                          <p>
                            {
                              // Truncate description
                              row.product.description.length > 40
                                ? `${row.product.description.substring(
                                    0,
                                    40
                                  )}...`
                                : row.product.description
                            }
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <select
                        value={row.displayMode}
                        onChange={(e) => {
                          handleChangeDisplayMode(e, row.id);
                        }}
                        className="w-full py-[4px] px-4 outline-none cursor-pointer"
                      >
                        {modes.current.map((mode) => (
                          <option key={mode.id} value={mode.id}>
                            {mode.name}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell
                      className="cursor-pointer"
                      align="center"
                      onClick={() => {
                        handleFocusInput(row.id);
                      }}
                    >
                      {focusInput === row.id ? (
                        <div className="flex ">
                          <input
                            id={row.id}
                            type="text"
                            value={Number(stock)}
                            onChange={handleChangeStockValue}
                            className="w-full px-2 py-1 outline-none"
                          />
                          <button
                            type="submit"
                            onClick={() => {
                              handleSubmitChangeStock(row.id);
                            }}
                          >
                            <CheckIcon className="cursor-pointer" />
                          </button>
                        </div>
                      ) : (
                        <span className="w-full">{row.stock}</span>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(row.price)}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex">
                        <button
                          onClick={() => {
                            editProduct(row.id);
                          }}
                          type="button"
                          className="hover:underline  border-r-2 px-2 py-1 border-slate-300"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            quickDeleteAProduct(row.id);
                          }}
                          type="button"
                          className="hover:underline  px-2"
                        >
                          Xóa
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="select-none"
          rowsPerPageOptions={[8, 20, 30, { label: "Tất cả", value: -1 }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng trên mỗi trang"
        />
      </Paper>
    </Box>
  );
}
