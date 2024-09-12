import { useState, useEffect } from "react";

import {
  IonInput,
  IonButton,
  IonText,
  IonInputPasswordToggle,
  IonIcon,
  IonSpinner,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { shieldCheckmark, checkmark, help } from "ionicons/icons";

import { useParams, useHistory, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import Layout from "@/components/Layout/Layout";
import Brand from "@/components/Brand/Brand";
import Error from "@/components/Error/Error";

function PasswordReset() {
  useTitle({ title: "Reset your password" });

  const { token } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenedToast, setIsOpenedToast] = useState(false);
  const [isSuccessfullToast, setIsSuccessfullToast] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    authenticationService
      .isResetPasswordTokenValid(token)
      .then((response) => {
        !response.data.is_reset_password_token_valid && history.push("/");
      })
      .catch(() => {
        setIsSuccessfullToast(false);
        setIsOpenedToast(true);
        history.push("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPassword(token, data.password)
      .then(() => {
        setIsSuccessfullToast(true);
        setIsOpenedToast(true);
        history.push("/");
      })
      .catch(() => {
        setIsSuccessfullToast(false);
        setIsOpenedToast(true);
        history.push("/");
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  return (
    <Layout className="ion-padding">
      {isLoading ? (
        <IonSpinner
          color="primary"
          style={{
            position: "absolute",
            top: "17.5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonTitle color="primary">
                <Link to="/">
                  <Brand maximumWidth="250px" />
                </Link>
              </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonText color="primary" className="ion-text-center">
            <h2
              style={{
                marginTop: ".35em",
              }}
            >
              Reset your password
            </h2>
          </IonText>

          <IonText color="medium" className="ion-text-center">
            <p>Enter your new password below.</p>
          </IonText>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              maxWidth: "411px",
              marginInline: "auto",
            }}
          >
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
              {isSubmittingForm ? <IonSpinner /> : "Save"}
            </IonButton>
          </form>

          <Link
            to="/"
            style={{
              display: "block",
              textAlign: "center",
            }}
          >
            I have changed my mind
          </Link>

          <IonToast
            isOpen={isOpenedToast}
            onDidDismiss={() => setIsOpenedToast(false)}
            message={
              isSuccessfullToast
                ? "Your password has been successfully reset."
                : "Something went wrong. Try again later."
            }
            icon={isSuccessfullToast ? checkmark : help}
            color={isSuccessfullToast ? "success" : "danger"}
            buttons={[
              {
                text: "Close",
                role: "cancel",
              },
            ]}
          />
        </>
      )}
    </Layout>
  );
}

export default PasswordReset;
