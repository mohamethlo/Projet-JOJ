import Swal from "sweetalert2";

export const showSuccess = (message: string, title = "Succès") => {
  Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#f97316", // orange-500
  });
};

export const showError = (message: string, title = "Erreur") => {
  Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#f97316",
  });
};

export const showWarning = (message: string, title = "Attention") => {
  Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#f97316",
  });
};
