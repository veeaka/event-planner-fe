import customToast from "../services/Toasts";
import { toastTypes } from "../utilities/consts";

// Define the type for your toast

// Define the function with improved type safety and optional return type
export const showToast = (
  message: string,
  type: string = toastTypes.DANGER
): void => {
  customToast(type, message);
};
