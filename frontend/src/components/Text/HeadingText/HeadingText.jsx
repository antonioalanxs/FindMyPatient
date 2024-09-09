import { IonText } from "@ionic/react";

/**
 * Heading text component. It displays a heading text.
 *
 * @param {string} text Heading text.
 *
 * @returns {JSX.Element} - The component.
 */
function HeadingText({ text }) {
  return (
    <>
      <IonText color="primary">
        <h2 style={{ fontSize: "2.75rem" }}>{text}</h2>
      </IonText>
    </>
  );
}

export default HeadingText;
