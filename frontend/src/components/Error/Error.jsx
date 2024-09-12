import { IonText } from "@ionic/react";

/**
 * Error text component. It displays an error message.
 *
 * @param {string} message Error message.
 *
 * @returns {JSX.Element} - The component.
 */
function ErrorText({ message }) {
  return (
    <>
      <IonText color="danger" className="ion-text-end">
        <p
          style={{
            fontSize: ".9em",
            marginBlock: ".5em",
          }}
        >
          {message}
        </p>
      </IonText>
    </>
  );
}

export default ErrorText;
