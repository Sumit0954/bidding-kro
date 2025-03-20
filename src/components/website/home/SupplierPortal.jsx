import styles from "./SupplierPortal.module.scss";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Business,
  MonetizationOn,
  Public,
  Star,
  Shield,
} from "@mui/icons-material";

const BuyersAndSupplier = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const rolesData = [
    {
      aspect: "Transaction Flow",
      buyer: "Requests bids to receive competitive offers.",
      supplier: "Submits offers and waits for buyer engagement.",
      icon: <Business fontSize="large" />,
    },
    {
      aspect: "Price Control & Transparency",
      buyer: "Sets the budget and evaluates price options from suppliers.",
      supplier: "Adjusts pricing based on market demand and competition.",
      icon: <MonetizationOn fontSize="large" />,
    },
    {
      aspect: "Market Reach",
      buyer: "Focused on exploring multiple offers for cost-effectiveness.",
      supplier: "Focused on capturing interest from active buyers.",
      icon: <Public fontSize="large" />,
    },
    {
      aspect: "Key Benefit",
      buyer: "Flexible decision-making based on a range of offers.",
      supplier: "Exposure to a larger pool of buyers and more bidding opportunities.",
      icon: <Star fontSize="large" />,
    },
    {
      aspect: "Risk Management",
      buyer: "Assesses risks based on supplier reliability and bid value.",
      supplier: "Monitors demand trends to adjust offers and mitigate risk.",
      icon: <Shield fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "1100px", mx: "auto", overflowX: "auto" }}>
      {/* Heading Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          className={styles["heading-with-lines"]}
        >
          Creating A Digital Ecosystem For Buyer And Supplier
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", mx: "auto", mt: 1 }}
        >
          Bidding Karo is a game-changing platform that streamlines industrial
          procurement through smart automation, selling, and negotiating.
        </Typography>
      </Box>

      {/* Table Header */}
      <Grid container spacing={0} sx={{ textAlign: "center", fontWeight: "bold" }}>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "#f5f5f5", p: 1 }}>
          Aspect
        </Grid>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "#002f6c", color: "white", p: 1 }}>
          Buyer
        </Grid>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "#009fe3", color: "white", p: 1 }}>
          Supplier
        </Grid>
      </Grid>

      {/* Table Rows */}
      {rolesData.map((role, index) => (
        <Grid
          container
          key={index}
          spacing={0}
          sx={{ textAlign: "center", alignItems: "stretch" }}
        >
          {/* Aspect Column with Icon */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              bgcolor: "#f9f9f9",
              p: isSmallScreen ? 1 : 2,
              fontWeight: "bold",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box sx={{ width: 30, display: "flex", alignItems: "center", mr: 1 }}>
                {role.icon}
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>{role.aspect}</Box>
            </Box>
          </Grid>

          {/* Buyer Role */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              border: "1px solid #ddd",
              bgcolor: "#9babc6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: isSmallScreen ? 1 : 2,
            }}
          >
            {role.buyer}
          </Grid>

          {/* Supplier Role */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              border: "1px solid #ddd",
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: isSmallScreen ? 1 : 2,
            }}
          >
            {role.supplier}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default BuyersAndSupplier;
