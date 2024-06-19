import React, { useContext, useState } from "react";
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

const BidQuestions = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ question: "" }]);

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
  const MAX_ADDRESS_COUNT = 5;

  const handleQuestions = () => {
    if (formCount < MAX_ADDRESS_COUNT) {
      append({ question: "" });
      setFormCount(formCount + 1);
    }
  };

  const handleDeleteQuestion = async (index, question_id) => {
    if (question_id) {
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
                    `${formCount >= MAX_ADDRESS_COUNT ? "disable" : ""}`
                  )}
                  onClick={handleQuestions}
                  disabled={formCount >= MAX_ADDRESS_COUNT ? true : false}
                >
                  + Add Question
                </button>
              </div>

              {fields.map((item, index) => (
                <IndividualQuestionForm
                  key={item._id}
                  question={item}
                  index={index}
                  action={action}
                  onDelete={handleDeleteQuestion}
                />
              ))}

              <div className={cn("my-3", styles["btn-container"])}>
                <button
                  className={cn("btn", "button")}
                  type="button"
                  onClick={() => navigate(`/portal/bids/create`)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={cn("btn", "button")}
                  onClick={() => navigate(`/portal/documents/${action}`)}
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

const IndividualQuestionForm = ({ question, index, action, onDelete }) => {
  const { control, handleSubmit, setError, watch } = useForm({
    defaultValues: {
      address: question,
    },
  });
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const submitForm = async (data, index) => {
    setLoading(true);

    let formData = new FormData();
    if (data) {
      formData.append("question", data.street);
    }

    console.log(data);
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

        <AccordionDetails>
          <div className="row">
            <div className="col-lg-12">
              <CustomInput
                control={control}
                label="Question For Supplier"
                name="question"
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
                  Save Address
                </button>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};
