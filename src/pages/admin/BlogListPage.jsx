import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { AdminApiUrls } from "../../helpers/api-urls/AdminApiUrls";
import { useEffect, useState } from "react";
import { TableCell } from "@mui/material";
import DataTable from "../../elements/CustomDataTable/DataTable";
import { blogs_column } from "../../elements/CustomDataTable/AdminColumnData";
import _sendAPIRequest from "../../helpers/api";
import DeleteDialog from "../../elements/CustomDialog/DeleteDialog";
import { Delete, Edit } from "@mui/icons-material";

const BlogListPage = () => {
  const [blogList, setBlogList] = useState([]);
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
    blogId: null,
  });

  const getBlogList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        AdminApiUrls.BLOG_LIST,
        "",
        true
      );
      if (response?.status === 200) {
        setBlogList(response?.data);
      }
    } catch (error) {
      console.log(error, " :error");
    }
  };

  const deleteBlog = async (blog_Id) => {
    try {
      const response = await _sendAPIRequest(
        "DELETE",
        `${AdminApiUrls.DELETE_BLOG}${blog_Id}/`,
        "",
        true
      );
      if (response) {
        console.log(response, " : deleted");
        getBlogList();
      }
    } catch (error) {
      console.log(error, " : error");
    }
  };

  const deleteBlogConfirmation = (choice) => {
    if (choice) {
      deleteBlog(deleteDetails.blogId);
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        blogId: null,
      });
    } else {
      setDeleteDetails({
        open: false,
        title: "",
        message: "",
        blogId: null,
      });
    }
  };

  const addAction = (cell) => {
    if (cell.column.id === "action") {
      const blog_id = cell?.row?.original?.id;
      return (
        <TableCell {...cell.getCellProps()} align="center" padding="none">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px", // Ensures consistent spacing between the icons
            }}
          >
            {/* Edit icon */}
            <NavLink to={`/admin/blogs/update/${blog_id}`}>
              <Edit
                style={{ cursor: "pointer", color: "#062d72" }} // Add pointer cursor for interactivity
              />
            </NavLink>

            {/* Slash separator */}
            <span style={{ fontSize: "18px" }}>/</span>

            {/* Dustbin icon (Delete) */}
            <Delete
              onClick={() =>
                setDeleteDetails({
                  open: true,
                  title: "Blog Delete Confirmation",
                  message:
                    "Are You Sure You want to delete this blog? This action cannot be undone.",
                  blogId: cell?.row?.original?.id,
                })
              }
              style={{ cursor: "pointer", color: "red" }}
            />
          </div>
        </TableCell>
      );
    } else {
      return (
        <TableCell {...cell.getCellProps()}> {cell.render("Cell")}</TableCell>
      );
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", paddingX: { xs: 1, sm: 2, md: 4 } }}>
        <Box
          sx={{
            marginBottom: "1rem",
            marginLeft: "10px",
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

      <DataTable
        propsColumn={blogs_column}
        propsData={blogList}
        action={addAction}
        customClassName="admin-data-table"
      />

      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={deleteBlogConfirmation}
        />
      )}
    </>
  );
};

export default BlogListPage;
