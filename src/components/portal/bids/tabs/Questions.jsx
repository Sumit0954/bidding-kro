import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../../../elements/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../../elements/CustomLoader/Loader";

const Questions = ({ bidDetails }) => {
  const { control, handleSubmit, reset } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState({});
  const [questions, setQuestions] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // Fetch questions and answers from API on component mount and after successful form submission
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await _sendAPIRequest(
          "GET",
          `${PortalApiUrls.RETRIEVE_INVITED_BID}${bidDetails?.id}/`,
          "",
          true
        );
        if (response?.data?.question) {
          console.log(response.data.question, "ty");
          setQuestions(response.data.question);
        }
      } catch (error) {
        setAlert({
          isVisible: true,
          message: "Failed to fetch questions. Please try again later.",
          severity: "error",
        });
      }
    };

    fetchQuestions();
  }, [bidDetails.id, submittedAnswers]); // Re-fetch when answers are updated

  const formSubmit = async (data, questionId) => {
    const answerText = data[`answer-${questionId}`];

    if (!answerText || answerText.trim() === "") {
      setAlert({
        isVisible: true,
        message: "Answer is required for the current question.",
        severity: "error",
      });
      return; // prevent submission if the answer is empty
    }

    setLoading((prev) => ({ ...prev, [questionId]: true }));

    const answers = [
      {
        question: questionId,
        text: data[`answer-${questionId}`],
      },
    ];

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls.UPDATE_ANSWER + `${bidDetails.id}/`,
        answers,
        true
      );
      if (response.status === 204) {
        setSubmittedAnswers((prev) => ({
          ...prev,
          [questionId]: data[`answer-${questionId}`],
        }));
        reset();
        setAlert({
          isVisible: true,
          message: "Answer submitted successfully.",
          severity: "success",
        });
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message:
          "There was a problem submitting your answer. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  return (
    <Box className="row" sx={{ marginTop: "2rem" }}>
      {/* Check if there are no questions */}
      {!questions || questions.length === 0 ? (
        <Typography>No questions available.</Typography>
      ) : (
        questions.map((question, index) => {
          const answer =
            submittedAnswers[question.id] ||
            (question.answer ? question.answer.text : null);

          return (
            <Box key={question.id} sx={{ marginBottom: "2rem" }}>
              <Typography>{`${index + 1}: ${question.text}`}</Typography>

              {/* Show submitted answer if it exists */}
              {answer && answer !== null && (
                <Typography sx={{ marginTop: "1rem", color: "green" }}>
                  Answer: {answer}
                </Typography>
              )}

              {/* Input field for answer/update */}
              <form
                onSubmit={handleSubmit((data) => formSubmit(data, question.id))}
              >
                <CustomInput
                  control={control}
                  name={`answer-${question.id}`}
                  multiline={true}
                  showLabel={false}
                  inputType="textarea"
                  // rules={{
                  //   required: "Answer is required.",
                  // }}
                  placeholder="Write your answer here..."
                  defaultValue={answer || ""}
                />

                {/* Submit button */}
                {loading[question.id] ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button className="btn button" type="submit">
                    {answer ? "Update Answer" : "Submit"}
                  </button>
                )}
              </form>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Questions;
