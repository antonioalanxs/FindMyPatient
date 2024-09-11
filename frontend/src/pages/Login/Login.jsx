import { useState, useContext } from "react";

import {
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonInputPasswordToggle,
  IonIcon,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { shieldCheckmark, person, lockClosed } from "ionicons/icons";

import { useForm } from "react-hook-form";

import { jwtDecode } from "jwt-decode";

import AuthenticationContext from "@/contexts/AuthenticationContext";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import Logo from "@/components/Logo/Logo";
import HeadingText from "@/components/Text/HeadingText/HeadingText";
import ErrorText from "@/components/Text/ErrorText/ErrorText";
import NavLink from "@/components/NavLink/NavLink";
import { DEFAULT_DURATION } from "@/constants";

function Login() {
  useTitle({ title: "Log in" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isOpenedToast, setIsOpenedToast] = useState(false);

  const { setIsUserAuthenticated } = useContext(AuthenticationContext);

  /**
   * Handles the login form submission.
   *
   * @param {Object} data - The form data.
   */
  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      ._login(data)
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        const user = jwtDecode(access_token);

        storageService._save(storageService.ACCESS_TOKEN, access_token);
        storageService._save(storageService.REFRESH_TOKEN, refresh_token);
        storageService._save(storageService.USER, user);

        setIsUserAuthenticated(true);
      })
      .catch(() => {
        setIsOpenedToast(true);
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  return (
    <>
      <IonContent className="ion-padding">
        <Logo />

        <HeadingText text="Log in" />

        <IonText color="medium">
          <p>Introduce your credentials to access to the system.</p>
        </IonText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonInput
            type="text"
            placeholder="Username"
            fill="outline"
            {...register("username", { required: "Username is required." })}
          >
            <IonIcon
              slot="start"
              icon={person}
              color="medium"
              aria-label="User"
              aria-hidden="true"
            ></IonIcon>
          </IonInput>
          <ErrorText message={errors?.username?.message} />

          <IonInput
            type="password"
            placeholder="Password"
            fill="outline"
            className="ion-margin-top"
            {...register("password", { required: "Password is required." })}
          >
            <IonIcon
              slot="start"
              icon={shieldCheckmark}
              color="medium"
              aria-label="Password"
              aria-hidden="true"
            ></IonIcon>
            <IonInputPasswordToggle slot="end" color="medium" />
          </IonInput>
          <ErrorText message={errors?.password?.message} />

          <IonButton
            type="submit"
            expand="block"
            disabled={isSubmittingForm}
            className="ion-margin-vertical"
          >
            {isSubmittingForm ? <IonSpinner /> : "Enter"}
          </IonButton>
        </form>

        <NavLink text="Do you have forgotten your password?"></NavLink>

        <IonToast
          isOpen={isOpenedToast}
          onDidDismiss={() => setIsOpenedToast(false)}
          message="Invalid credentials."
          duration={DEFAULT_DURATION}
          icon={lockClosed}
          color="danger"
        />
      </IonContent>
    </>
  );
}

export default Login;
