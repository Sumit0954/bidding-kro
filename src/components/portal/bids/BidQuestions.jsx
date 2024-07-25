import React, { useContext, useEffect, useState } from "react";
import styles from "./BidQuestions.module.scss";
import cn from "classnames";
import { useFieldArray, useForm } from "react-hook-form";
import { AlertContext } from "../../../contexts/AlertProvider";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest, { setErrors } from "../../../helpers/api";

const BidQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [bidStatus, setBidStatus] = useState("");

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidStatus(response.data.status);
            setQuestions(response.data.question);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id]);

  const { control, reset } = useForm({
    defaultValues: {
      questions: questions,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
    keyName: "_id",
  });

  const { setAlert } = useContext(AlertContext);
  const [formCount, setFormCount] = useState(fields.length);
  const MAX_QUESTION_COUNT = 5;

  useEffect(() => {
    reset({ questions });
    setFormCount(questions?.length);
  }, [questions, reset]);

  const handleQuestions = () => {
    if (formCount < MAX_QUESTION_COUNT) {
      append({ question: "" });
      setFormCount(formCount + 1);
    }
  };

  const handleDeleteQuestion = async (index, question_id) => {
    if (question_id) {
      try {
        const response = await _sendAPIRequest(
          "DELETE",
          PortalApiUrls.DELETE_QUESTION + `${question_id}/`,
          "",
          true
        );
        if (response.status === 204) {
          remove(index);
          setFormCount(formCount - 1);
          setAlert({
            isVisible: true,
            message: `Question ${index + 1} has been deleted.`,
            severity: "success",
          });
        }
      } catch (error) {
        const { data } = error.response;
        if (data) {
          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    } else {
      remove(index);
      setFormCount(formCount - 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles["form-container"]}>
            <div className={cn("row", styles["form-section"])}>
              <div className={styles["question-section"]}>
                <h4>Questions ({formCount})</h4>
                <button
                  type="button"
                  className={cn(
                    "btn",
                    "button",
                    `${formCount >= MAX_QUESTION_COUNT ? "disable" : ""}`
                  )}
                  onClick={handleQuestions}
                  disabled={
                    bidStatus === "cancelled" || formCount >= MAX_QUESTION_COUNT
                      ? true
                      : false
                  }
                >
                  + Add Question
                </button>
              </div>

              {fields.map((item, index) => (
                <IndividualQuestionForm
                  key={item._id}
                  question={item}
                  index={index}
                  id={id}
                  onDelete={handleDeleteQuestion}
                />
              ))}

              <div className={cn("my-3", styles["btn-container"])}>
                <button
                  className={cn("btn", "button")}
                  type="button"
                  onClick={() => navigate(`/portal/bids/categories/${id}`)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={cn("btn", "button")}
                  onClick={() => navigate(`/portal/bids/documents/${id}`)}
                  disabled={bidStatus === "cancelled" ? true : false}
                >
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidQuestions;

const IndividualQuestionForm = ({ question, index, id, onDelete }) => {
  const { control, handleSubmit, setError, watch } = useForm({
    defaultValues: {
      question: question,
    },
  });
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const submitForm = async (data, index) => {
    setLoading(true);

    let formData = new FormData();
    if (data) {
      formData.append("text", data.text);

      try {
        const response = await _sendAPIRequest(
          "POST",
          PortalApiUrls.ADD_QUESTION + `${id}/`,
          formData,
          true
        );
        if (response.status === 201) {
          window.location.reload();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        const { data } = error.response;
        if (data) {
          setErrors(data, watch, setError);

          if (data.error) {
            setAlert({
              isVisible: true,
              message: data.error,
              severity: "error",
            });
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => submitForm(data, index))}>
      <Accordion
        defaultExpanded
        square={true}
        classes={{
          root: `custom-accordion ${styles["question-accordion"]}`,
        }}
      >
        <AccordionSummary className={styles["custom-accordion-summary"]}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Question {index + 1}
          </Typography>
          <IconButton className={styles["delete-btn"]}>
            <Delete onClick={() => onDelete(index, question?.id)} />
          </IconButton>
        </AccordionSummary>

        {question.id && <AccordionDetails>{question.text}</AccordionDetails>}

        {!question.id && (
          <AccordionDetails>
            <div className="row">
              <div className="col-lg-12">
                <CustomInput
                  control={control}
                  label="Question For Supplier"
                  name="text"
                  placeholder="Question For Supplier"
                  rules={{
                    required: "Question is required.",
                  }}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col text-end">
                {loading ? (
                  <ButtonLoader size={60} />
                ) : (
                  <button
                    type="submit"
                    className={cn("btn", "button")}
                    onClick={handleSubmit((data) => submitForm(data, index))}
                  >
                    Save Question
                  </button>
                )}
              </div>
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </form>
  );
};
