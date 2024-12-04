import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { DEFAULT_DURATION } from "@/core/constants";

/**
 * Service class for showing notifications.
 *
 * This class is a singleton, so it should be instantiated only once.
 *
 * @class
 * @category Services
 * @subcategory NotificationService
 */
class NotificationService {
  static instance = new NotificationService();

  constructor() {
    this._swal = withReactContent(Swal);

    this.ICONS = {
      SUCCESS: "success",
      ERROR: "error",
      WARNING: "warning",
      INFO: "info",
      QUESTION: "question",
    };
  }

  /**
   * Show a toast notification.
   *
   * @param {string} html - HTML content of the notification.
   * @param {string} icon - Icon of the notification. Possible values are "success", "error", "warning", "info" and "question". Default is "info".
   * @param {number} timer - Timeout of the notification. If not provided, it will use the default timeout.
   */
  showToast(html, icon, timer = DEFAULT_DURATION) {
    this._swal.fire({
      html: html,
      icon: icon || this.ICONS.INFO,
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

  /**
   * Show a modal notification.
   *
   * @param {string} html - HTML content of the notification.
   * @param {string} icon - Icon of the notification. Possible values are "success", "error", "warning", "info" and "question". Default is "info".
   */
  showModal(html, icon) {
    this._swal.fire({
      html: html,
      icon: icon || this.ICONS.INFO,
    });
  }
}

export const notificationService = NotificationService.instance;
