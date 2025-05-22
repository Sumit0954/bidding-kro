// import styles from "./TransactionList.module.scss";
import { useContext, useEffect, useState } from "react";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { Box, Alert, TextField, Button, TableCell } from "@mui/material";
import { transactions_column } from "../../../elements/CustomDataTable/AdminColumnData";
import _sendAPIRequest from "../../../helpers/api";
import { AdminApiUrls } from "../../../helpers/api-urls/AdminApiUrls";
import { Controller, useForm } from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertProvider";
import cn from "classnames";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const { setAlert } = useContext(AlertContext);

  const onSubmit = async (data) => {
    try {
      const updateTransactionAmount = new FormData();
      updateTransactionAmount.append("amount", data.amount);
      const response = await _sendAPIRequest(
        "PUT",
        AdminApiUrls.UPDATE_BID_PRICE,
        updateTransactionAmount,
        true
      );
      if (response?.status === 200) {
        setAlert({
          isVisible: true,
          message: "Bid Transaction Amount has been updated",
          severity: "success",
        });
        reset({
          amount: response?.data?.amount,
        });
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };
  const addAction = (cell) => {
    return (
      <TableCell {...cell.getCellProps()} align={cell.column.align}>
        {" "}
        {cell.render("Cell")}{" "}
      </TableCell>
    );
  };

  const getTransactions = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls.GET_TRANSACTIONS,
        "",
        true
      );
      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentAmount = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls?.BID_PRICE_AMOUNT,
        "",
        true
      );

      if (response?.status === 200) {
        console.log(response?.data?.amount, " Amount");
        reset({
          amount: response?.data?.amount,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getPaymentAmount();
    getTransactions();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Alert severity="info" sx={{ flex: 1, marginRight: 2 }}>
          <p style={{ margin: 0 }}>
            <strong>Note:</strong> Admin can update the transaction amount for
            each bid.
          </p>
        </Alert>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              validate: (value) => !isNaN(value) || "Must be a number",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px" }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isSubmitting}
              />
            )}
          />
          {isSubmitting ? (
            <ButtonLoader size={60} />
          ) : (
            <button type="submit" className={cn("btn", "button")}>
              Update Amount
            </button>
          )}
        </Box>
      </Box>

      <DataTable
        propsColumn={transactions_column}
        propsData={transactions}
        action={addAction}
        customClassName="admin-data-table"
      />
    </>
  );
};

export default TransactionList;
