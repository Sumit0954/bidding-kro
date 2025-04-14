import * as XLSX from "@e965/xlsx";
import { dateTimeFormatter } from "../helpers/formatter";

export const exportToExcel = (
  data,
  columns,
  fileName = "data.xlsx",
  excludeColumns = []
) => {
  // console.log("Exclude Columns:", excludeColumns);
  // console.log(
  //   "Original Columns:",
  //   columns.map((col) => col.accessor)
  // );

  // Filter out dynamic excluded columns
  const filteredColumns = columns.filter(
    (col) => !excludeColumns.includes(col.accessor)
  );

  // Map columns to create the header row
  const headers = filteredColumns.map((col) => col.Header);

  // Map data to match the column order
  const rows = data.map((row) =>
    filteredColumns.map((col) => {
      let value = row[col.accessor] || "";

      // Apply date-time formatting if the column is for dates
      if (
        col.accessor === "bid_open_date" ||
        col.accessor === "bid_close_date"
      ) {
        console.log("Before formatting:", value);
        value = value ? dateTimeFormatter(value) : "";
        console.log("After formatting:", value);
      }

      return value;
    })
  );

  // Combine headers and rows
  const worksheetData = [headers, ...rows];

  // Create worksheet and workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write file and trigger download
  XLSX.writeFile(workbook, fileName);
};
