import React from "react";
import styles from "./CustomCkEditor.module.scss";
import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomCkEditor = ({
  label = "",
  control,
  name = "",
  rules = {},
  showLabel = true,
  customClassName = "",
}) => {
  const config = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "link",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
  };

  return (
    <Box className={styles["input-field-container"]}>
      {showLabel && (
        <label>
          {label} {rules?.required && <em className="em">*</em>}
        </label>
      )}

      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <Box ref={ref} className={styles['form-control']}>
            <CKEditor
              className={styles['custom-editor']}
              editor={ClassicEditor}
              config={config}
              data={value}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
              }}
              onBlur={(event, editor) => {
                onBlur(event);
              }}
              onFocus={(event, editor) => {}}
            />
            {error && (
              <span className="error">{error.message || "Error"} </span>
            )}
          </Box>
        )}
      />
    </Box>
  );
};

export default CustomCkEditor;
