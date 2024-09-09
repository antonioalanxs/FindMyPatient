import { useState } from "react";

import {
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonInputPasswordToggle,
  IonIcon,
  IonHeader,
  IonTitle,
  IonSpinner,
} from "@ionic/react";
import { shieldCheckmark, person } from "ionicons/icons";

import { useForm } from "react-hook-form";

import Logo from "@/components/Text/Logo/Logo";
import HeadingText from "@/components/Text/HeadingText/HeadingText";
import ErrorText from "@/components/Text/ErrorText/ErrorText";
import NavLink from "@/components/NavLink/NavLink";
import { useTitle } from "@/hooks/useTitle";

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

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmittingForm(true);
  };

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonTitle>
          <Logo />
        </IonTitle>
      </IonHeader>

      <IonContent className="ion-padding">
        <HeadingText text="Log in" />

        <IonText color="medium">
          <p>Introduce your credentials to access to the system.</p>
        </IonText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonInput
            type="text"
            placeholder="User"
            fill="outline"
            {...register("user", { required: "User is required." })}
          >
            <IonIcon
              slot="start"
              icon={person}
              color="medium"
              aria-label="User"
              aria-hidden="true"
            ></IonIcon>
          </IonInput>
          <ErrorText message={errors?.user?.message} />

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
      </IonContent>
    </>
  );
}

export default Login;
