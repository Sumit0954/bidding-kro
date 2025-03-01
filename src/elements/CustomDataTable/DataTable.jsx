import {
  Box,
  Checkbox,
  // IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  ThemeProvider,
  Toolbar,
  // Tooltip,
  Typography,
  alpha,
  createTheme,
} from "@mui/material";

import { useTable } from "react-table";
// import { Delete } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./DataTable.module.scss";
import { visuallyHidden } from "@mui/utils";
import { debounce } from "lodash";
import cn from "classnames";

function descendingComparator(a, b, orderBy) {
  if (b.values[orderBy] < a.values[orderBy]) {
    return -1;
  }
  if (b.values[orderBy] > a.values[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headerGroups,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headerGroup.headers.map((column) => (
            <TableCell
              sx={{ minWidth: column.width }}
              {...column.getHeaderProps()}
              key={column.id}
              align={column.align}
              padding={column.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id && !column.hideSortIcon}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
                hideSortIcon={column.hideSortIcon}
              >
                {column.render("Header")}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, rowCount, setSearchQuery } = props;

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
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", color: "#062d72", fontWeight: "bolder" }}
          variant="subtitle1"
          id="tableTitle"
          component="div"
        >
          Showing {rowCount} results
        </Typography>
      )}
      <EnhancedTableSearchBar setSearchQuery={setSearchQuery} />
    </Toolbar>
  );
}

function EnhancedTableSearchBar(props) {
  const { setSearchQuery } = props;

  // Debounce the search input
  const debouncedSearch = useMemo(
    () => debounce((query) => setSearchQuery(query), 300),
    [setSearchQuery]
  );

  const handleSearch = (search_keyword) => {
    const query = search_keyword.toLowerCase();
    debouncedSearch(query);
  };

  useEffect(() => {
    // Cleanup the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <TextField
      InputProps={{
        placeholder: "Search...",
        type: "search",
      }}
      classes={{ root: styles["search-input-field"] }}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}

const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#e7effe !important", // Override the default hover color
          },
        },
      },
    },
  },
});

const DataTable = ({
  propsColumn,
  propsData,
  action = (cell) => (
    <TableCell {...cell.getCellProps()}> {cell.render("Cell")} </TableCell>
  ),
  customClassName = "",
  isSingleSelection = false,
  setSelectedRow,
  hideToolbar = false,
  hidePagination = false,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = useMemo(() => propsColumn, [propsColumn]);
  const data = useMemo(() => propsData, [propsData]);

  const { headerGroups, getTableProps, getTableBodyProps, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = useMemo(() => {
  //   if (searchQuery) {
  //     const filtered = rows.filter((row) =>
  //       row.allCells.some((cell) =>
  //         String(cell.value).toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     );

  //     return stableSort(filtered, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     );
  //   } else {
  //     return stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     );
  //   }
  // }, [order, orderBy, page, rowsPerPage, rows, searchQuery]);

  const visibleRows = useMemo(() => {
    if (searchQuery) {
      // Filter rows based on search query
      const filtered = rows.filter(
        (row) =>
          row.allCells &&
          row.allCells.some((cell) =>
            String(cell.value).toLowerCase().includes(searchQuery.toLowerCase())
          )
      );

      return stableSort(filtered, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else {
      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
  }, [order, orderBy, page, rowsPerPage, rows, searchQuery]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={styles[customClassName]}>
          <Paper className={styles["paper-root"]}>
            {!hideToolbar && (
              <EnhancedTableToolbar
                numSelected={0}
                rowCount={rows.length}
                setSearchQuery={setSearchQuery}
              />
            )}
            <TableContainer className={styles["data-table"]}>
              <Table
                sx={{ minWidth: 750, width: "100%" }}
                aria-labelledby="tableTitle"
                {...getTableProps()}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headerGroups={headerGroups}
                />

                <TableBody {...getTableBodyProps()}>
                  {visibleRows.map((row, index) => {
                    prepareRow(row);

                    return (
                      <TableRow
                        {...row.getRowProps()}
                        hover
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >
                        {row.cells.map((cell) => {
                          return action(cell);
                        })}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {!hidePagination && (
              <TablePagination
                classes={{
                  root: styles["custom-table-pagination"],
                }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default DataTable;
