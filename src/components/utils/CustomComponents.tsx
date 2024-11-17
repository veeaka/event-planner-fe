import { styled, TextareaAutosize, TextField } from "@mui/material";
import { textColors, themeColors } from "../../assets/colors";

export const TextInput = styled(TextField)<{ height?: string; width?: string }>(
  ({ theme, height = "45px", width = "100%" }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      height, // Set height from props
      width, // Set width from props
      fontSize: "16px",
      "& fieldset": {
        fontSize: "16px",
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
  })
);

export const StyledFormGroup = styled("div")(
  ({ theme, margin = "15px auto 20px auto" }) => ({
    margin: margin,
    textAlign: "left",
  })
);
export const StyledLabel = styled("label")`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${textColors.primary};
`;
export const StyledHeading = styled("h1")`
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  color: #2d2d2d;
  margin-top: 10px;
  padding-top: 30px;
`;

export const StyledSubHeading = styled("p")(({ theme, color = "#6065D8" }) => ({
  fontWeight: 300,
  fontSize: "12px",
  marginBottom: "25px",
  lineHeight: "18px",
  color: "#2D2D2D",
}));

export const StyledAsterisk = styled("span")`
  font-size: 12px;
  color: red;
`;

export const StyledButton = styled("button")(
  ({
    theme,
    color = themeColors.primary,
    width = 350,
    height = 45,
    margin = "10px 0px 0px 0px",
  }) => ({
    backgroundColor: color,
    width: width,
    height: height,
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    margin: margin,
  })
);

export const StyledOutlinedButton = styled("button")(
  ({ theme, color = themeColors.primary, width = 350, height = 45 }) => ({
    backgroundColor: "white",
    width: width,
    height: height,
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#333",
    border: "1px solid #333",
    cursor: "pointer",
    marginTop: "10px",
  })
);

export const StyledSpaceBetween = styled("div")(
  ({ theme, color = "#6065D8" }) => ({
    justifyContent: "space-between",
    display: "flex",
  })
);

export const AuthContainer = styled("div")(({ theme, color = "#6065D8" }) => ({
  margin: "150px auto",
  display: "flex",
  width: "350px",
  height: "350px",
  justifyContent: "center",
  padding: "50px 40px 20px 40px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "auto",
    margin: "80px auto",
  },
}));

export const Textarea = styled(TextareaAutosize)(({}) => ({
  width: "95%",
  padding: "8px 12px",
  border: "0.5px solid grey",
  borderRadius: "8px",
}));
