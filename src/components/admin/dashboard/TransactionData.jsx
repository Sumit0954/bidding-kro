import { AccessTimeOutlined, CheckCircleOutline } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import DataTable from "../../../elements/CustomDataTable/DataTable";
import { transactionDataStats } from "../../../elements/CustomDataTable/AdminColumnData";

const TransactionData = () => {
  const stats = [
    {
      title: "Completed Transaction",
      count: 250,
      description:
        "250 users have successfully registered their companies in Bidding Kro.",
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
    {
      title: "Failed Transaction",
      count: 58,
      description: "58 users didn't register their companies in Bidding Kro.",
      icon: <AccessTimeOutlined style={{ color: "orange" }} />,
    },
    {
      title: "Pending Payments",
      count: 140,
      description:
        "140 bids have been successfully completed by registered companies.",
      icon: <CheckCircleOutline style={{ color: "green" }} />,
    },
  ];
  return (
    <>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 10 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{ position: "relative", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {stat.title}
                </Typography>
                <div style={{ position: "absolute", top: 10, right: 15 }}>
                  {stat.icon}
                </div>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                  {stat.count}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DataTable propsColumn={transactionDataStats} propsData={[]} />
    </>
  );
};

export default TransactionData;
