import { Box } from "@mui/material";
import BlogList from "../../components/admin/blog/BlogList";
import { NavLink } from "react-router-dom";
import cn from "classnames";

const BlogListPage = () => {
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
            <NavLink to={"/admin/blog/create"} className={cn("btn", "button")}>
              + Create Blog
            </NavLink>
          </Box>
        </Box>
      </Box>
      <BlogList />
    </>
  );
};

export default BlogListPage;
