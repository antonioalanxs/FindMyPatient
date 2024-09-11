import { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import {
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

import { usePublicRouteGuard } from "@/hooks/guards/usePublicRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import Brand from "@/components/Brand/Brand";
import Error from "@/components/Error/Error";
import { DEFAULT_DURATION } from "@/constants";
import Layout from "@/components/Layout/Layout";

function Login() {
  usePublicRouteGuard();

  useTitle({});

  const history = useHistory();

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

        history.push("/home");
      })
      .catch((error) => {
        console.error(error);
        setIsOpenedToast(true);
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  return (
    <Layout className="ion-padding">
      <Brand />

      <IonText
        color="dark"
        className="ion-text-center"
        style={{
          textWrap: "no",
        }}
      >
        <h2>The platform where doctors can be sure of their patients.</h2>
      </IonText>

      <IonText color="primary" className="ion-text-center">
        <h3
          style={{
            marginTop: "2.50em",
          }}
        >
          Log in
        </h3>
      </IonText>

      <IonText color="medium" className="ion-text-center">
        <p>Introduce your credentials to access to the system.</p>
      </IonText>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "411px",
          marginInline: "auto",
        }}
      >
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
        <Error message={errors?.username?.message} />

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
        <Error message={errors?.password?.message} />

        <IonButton
          type="submit"
          expand="block"
          disabled={isSubmittingForm}
          className="ion-margin-vertical"
        >
          {isSubmittingForm ? <IonSpinner /> : "Enter"}
        </IonButton>
      </form>

      <Link
        to="/"
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        Do you have forgotten your password?
      </Link>

      <IonToast
        isOpen={isOpenedToast}
        onDidDismiss={() => setIsOpenedToast(false)}
        message="Invalid credentials."
        duration={DEFAULT_DURATION}
        icon={lockClosed}
        color="danger"
      />
    </Layout>
  );
}

export default Login;
