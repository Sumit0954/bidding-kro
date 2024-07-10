import CompanyList from "../../../components/portal/companies/CompanyList"
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import cn from "classnames";

const CompanyListPage = () => {
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: "13px" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box>
            <NavLink to={"/portal/companies"} className={cn("btn", "button")}>
              MY Company
            </NavLink>
          </Box>
        </Box>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box>
            <NavLink to={"/portal/companies"} className={cn("btn", "button")}>
              +  Invite Company
            </NavLink>
          </Box>
        </Box>



      </Box>


      <CompanyList />
    </>
  )
}

export default CompanyListPage