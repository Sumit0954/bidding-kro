import { Box } from "@mui/material";
import BlogList from "../../components/admin/blog/BlogList";
import { NavLink } from "react-router-dom";
import cn from "classnames";

const BlogListPage = () => {
  return (
    <>
      <Box sx={{ width: "100%", paddingX: { xs: 1, sm: 2, md: 4 } }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
          }}
        >
          <NavLink
            to={"/admin/blogs/create"}
            className={cn("btn", "button")}
            style={{
              fontSize: "14px",
              padding: "8px 12px",
              whiteSpace: "nowrap",
              width: "auto",
            }}
          >
            + Create Blog
          </NavLink>
        </Box>
      </Box>

      <BlogList />
    </>
  );
};

export default BlogListPage;
