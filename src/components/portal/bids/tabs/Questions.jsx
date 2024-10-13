import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import CustomInput from "../../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";

const Questions = ({ bidDetails }) => {
  const { control, handleSubmit } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    setLoading(true);
    let answers = Object.entries(data).map(([key, value]) => {
      const question = key.split("-")[1];
      return {
        question: parseInt(question, 10),
        text: value,
      };
    });

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.UPDATE_ANSWER + `${bidDetails.id}/`,
        answers,
        true
      );
      if (response.status === 204) {
        setLoading(false);
        setAlert({
          isVisible: true,
          message: "Answer Submited successfully.",
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        isVisible: true,
        message:
          "There was a problem submitting your answer. Please try again later.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box classname="row" sx={{ marginTop: "2rem" }}>
        <form onSubmit={handleSubmit(formSubmit)}>
          {bidDetails?.question?.length > 0 &&
            bidDetails?.question?.map((question) => {
              return (
                <>
                  <Box sx={{ marginBottom: "2rem" }}>
                    <Typography>{question.text}</Typography>
                    <CustomInput
                      control={control}
                      name={`answer-${question.id}`}
                      multiline={true}
                      showLabel={false}
                      inputType="textarea"
                      rules={{
                        required: "Answer is required.",
                      }}
                      placeholder="write your answer here..."
                    />
                    {loading ? (
                      <ButtonLoader size={60} />
                    ) : (
                      <button className="btn button" type="submit">
                        Submit
                      </button>
                    )}
                  </Box>
                </>
              );
            })}
        </form>
      </Box>
    </>
  );
};

export default Questions;
