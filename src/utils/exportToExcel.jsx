import * as XLSX from "@e965/xlsx";
import { dateTimeFormatter } from "../helpers/formatter";
/**
 * Exports tabular data to an Excel (.xlsx) file using specified columns and custom formatting.
 *
 * @param {Array<Object>} data - The data to export, typically an array of objects representing rows.
 * @param {Array<Object>} columns - The column configuration used for table rendering. Each column should have:
 *   - `accessor` (string | function): Field name or a function to derive value from a row.
 *   - `Header` (string): The column title to be used in the Excel header row.
 * @param {string} [fileName="data.xlsx"] - The name of the downloaded Excel file.
 * @param {Array<string>} [excludeColumns=[]] - List of `accessor` keys to exclude from the export.
 *
 * @example
 * exportToExcel(data, columns, "bids.xlsx", ["internal_id"]);
 */
export const exportToExcel = (
  data,
  columns,
  fileName = "data.xlsx",
  excludeColumns = []
) => {
  // Filter out dynamic excluded columns
  const filteredColumns = columns.filter(
    (col) => !excludeColumns.includes(col.accessor)
  );

  // Map columns to create the header row
  const headers = filteredColumns.map((col) => col.Header);

  // Map data to match the column order
  const rows = data.map((row) =>
    filteredColumns.map((col) => {
      let value = "";

      // 1. Handle function accessor
      if (typeof col.accessor === "function") {
        value = col.accessor(row); // ✅ make sure this line is actually used
      }

      // 2. Handle string accessor (including nested fields)
      else if (typeof col.accessor === "string") {
        // Check if it's nested (e.g., 'user.first_name')
        if (col.accessor.includes(".")) {
          const keys = col.accessor.split(".");
          value = keys.reduce(
            (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
            row
          );
        } else {
          value = row[col.accessor] || "";
        }
      }

      // 3. Handle specific formatting
      const dateColumns = [
        "bid_open_date",
        "bid_close_date",
        "created_at",
        "updated_at",
      ];
      if (dateColumns.includes(col.accessor)) {
        value = value ? dateTimeFormatter(value) : "Not Declared";
      }
      if (col.accessor === "category" && Array.isArray(value)) {
        value =
          value.length > 0 ? value.map((cat) => cat.name).join(", ") : "N/A";
      }

      if (col.accessor === "product" && Array.isArray(value)) {
        value =
          value.length > 0
            ? value.map((product) => product.title).join(", ")
            : "N/A";
      }

      if (col.accessor === "organization_type" && !value) {
        value = "N/A";
      }
      if (
        col.Header === "Designation" ||
        (col.Header === "Whatsapp Number" && value === "")
      ) {
        value = "N/A";
      }
      if (col.Header === "Created At" && value) {
        value = dateTimeFormatter(value);
      }
      if (col.accessor === "total_bid_amount" && value === "") {
        value = "N/A";
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
