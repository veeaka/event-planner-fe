import toast from "react-hot-toast";
import SuccessToastImage from "../assets/toast/success.svg";
import ErrorToastImage from "../assets/toast/error.svg";
import CloseToastImage from "../assets/toast/close.svg";
import { styled } from "@mui/material";
import WarningToastImage from "../assets/toast/warning.svg";
import { toastColors } from "../assets/colors";
import { toastDuration, toastTypes } from "../utilities/consts";
import React from "react";

const customToast = (type: any, message: any, duration = toastDuration) => {
  if (type === toastTypes.DANGER) {
    toast.custom(
      (t) => (
        <ErrorSpan>
          <img src={ErrorToastImage} alt="Error" />
          <Title className="my-auto">{message}</Title>
          <img
            src={CloseToastImage}
            onClick={() => toast.remove()}
            role="button"
            style={{ height: "20px", width: "20px" }}
            alt="Close Button"
          />
        </ErrorSpan>
      ),
      {
        duration,
      }
    );
  } else if (type === toastTypes.SUCCESS) {
    toast.custom(
      (t) => (
        <SuccessSpan>
          <img src={SuccessToastImage} alt="Success" />
          <Title className="my-auto">{message}</Title>
          <img
            src={CloseToastImage}
            onClick={() => toast.remove()}
            style={{ height: "20px", width: "20px" }}
            role="button"
            alt="Close Button"
          />
        </SuccessSpan>
      ),
      {
        duration,
      }
    );
  } else {
    toast.custom(
      (t) => (
        <WarningSpan>
          <img src={WarningToastImage} alt="Warning" />
          <Title className="my-auto">{message}</Title>
          <img
            src={CloseToastImage}
            onClick={() => toast.remove()}
            role="button"
            style={{ height: "20px", width: "20px" }}
            alt="Close Button"
          />
        </WarningSpan>
      ),
      {
        duration,
      }
    );
  }
};

export default customToast;

const Title = styled("h1")(() => ({
  color: "white",
  fontSize: "13px",
  fontWeight: 400,
  textAlign: "center",
  verticalAlign: "center",
  marginLeft: "10px",
  marginRight: "50px",
}));

const ErrorSpan = styled("span")(() => ({
  padding: "14px",
  display: "flex",
  backgroundColor: toastColors.error,
  alignItems: "center",
  borderRadius: "5px",
}));

const SuccessSpan = styled("span")(() => ({
  padding: "14px",
  display: "flex",
  backgroundColor: toastColors.success,
  alignItems: "center",
  borderRadius: "5px",
}));

const WarningSpan = styled("span")(() => ({
  padding: "14px",
  display: "flex",
  backgroundColor: toastColors.warning,
  alignItems: "center",
  borderRadius: "5px",
}));
