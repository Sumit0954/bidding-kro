import TemplateList from "../../components/admin/template/TemplateList"
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import cn from "classnames";

const TemplateListPage = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box>
            <NavLink to={"/admin/template/create"} className={cn("btn", "button")}>
              + Create New Template
            </NavLink>
          </Box>
        </Box>
      </Box>

      <TemplateList />
    </>
  )
}

export default TemplateListPage