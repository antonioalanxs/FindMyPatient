import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { DEFAULT_DURATION } from "@/core/constants/default";

class NotificationService {
  static instance = new NotificationService();

  constructor() {
    if (NotificationService.instance) {
      return NotificationService.instance;
    }

    this._swal = withReactContent(Swal);

    this.TYPE = {
      SUCCESS: "success",
      ERROR: "error",
      WARNING: "warning",
      INFO: "info",
      QUESTION: "question",
    };

    NotificationService.instance = this;
  }

  showToast(html, icon, timer = DEFAULT_DURATION) {
    this._swal.fire({
      html: html,
      icon: icon || this.TYPE.INFO,
      toast: true,
      showConfirmButton: false,
      position: "top-end",
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  showConfirmDialog(title, text, function_) {
    this._swal
      .fire({
        title: title,
        text: text,
        icon: this.TYPE.WARNING,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        result.isConfirmed && function_();
      });
  }
}

export const notificationService = NotificationService.instance;
