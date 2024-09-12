import { useState } from "react";

import {
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonSpinner,
  IonToast,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import { mail, checkmark, helpOutline } from "ionicons/icons";

import { Link } from "react-router-dom";

import { set, useForm } from "react-hook-form";

import { usePublicRouteGuard } from "@/hooks/guards/usePublicRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import Layout from "@/components/Layout/Layout";
import Error from "@/components/Error/Error";
import { HTTP_200_OK, BRAND_NAME } from "@/constants";

function PasswordResetRequest() {
  usePublicRouteGuard();

  useTitle({ title: "Password reset request" });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [wasSuccessfulToast, setWasSuccessfulToast] = useState(false);
  const [isOpenedToast, setIsOpenedToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPasswordRequest(data.mail)
      .then(() => {
        setWasSuccessfulToast(true);
      })
      .catch(() => {
        setWasSuccessfulToast(false);
      })
      .finally(() => {
        setIsSubmittingForm(false);
        setIsOpenedToast(true);
      });
  };

  return (
    <>
      <Layout>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" color="primary" />
            </IonButtons>

            <IonTitle color="primary" slot="end">
              <h1
                style={{
                  margin: "0",

                  fontWeight: "525",
                  fontSize: "1.35rem",
                }}
              >
                {BRAND_NAME}
              </h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            maxWidth: "430px",
            marginInline: "auto",
          }}
        >
          <IonText color="medium" className="ion-text-center">
            <p>We will send you a link to recover your password.</p>
          </IonText>

          <IonInput
            type="text"
            placeholder="Mail"
            fill="outline"
            {...register("mail", { required: "Mail is required." })}
          >
            <IonIcon
              slot="start"
              icon={mail}
              color="medium"
              aria-label="Mail"
              aria-hidden="true"
            ></IonIcon>
          </IonInput>
          <Error message={errors?.mail?.message} />

          <IonButton
            type="submit"
            expand="block"
            disabled={isSubmittingForm}
            className="ion-margin-vertical"
          >
            {isSubmittingForm ? <IonSpinner /> : "Send"}
          </IonButton>
        </form>

        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          Do you have remembered your password?
        </Link>

        <IonToast
          isOpen={isOpenedToast}
          onDidDismiss={() => setIsOpenedToast(false)}
          message={
            wasSuccessfulToast
              ? "Link sent. Check your mail."
              : "Introduced mail does not exist."
          }
          color={wasSuccessfulToast ? "success" : "danger"}
          icon={wasSuccessfulToast ? checkmark : helpOutline}
          buttons={[
            {
              text: "Close",
              role: "cancel",
            },
          ]}
        />
      </Layout>
    </>
  );
}

export default PasswordResetRequest;
