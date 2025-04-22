import { phoneNumberPipe } from "@/core/pipes/phoneNumberPipe";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import MapServer from "@/shared/components/Map/MapServer/MapServer";
import DataCard from "@/modules/in/components/DataCard/DataCard";

function PatientRealTimeLocationCard({ user }) {
  const data = [
    {
      icon: "bi-telephone",
      title: "Phone",
      content: phoneNumberPipe.transform(user?.phone_number),
    },
    {
      icon: "bi-envelope",
      title: "Email",
      content: user?.email,
    },
    {
      icon: "bi-hospital",
      title: "Social security code",
      content: user?.patient?.social_security_code,
    },
    {
      icon: "bi-person-vcard",
      title: "Identity card number",
      content: user?.identity_card_number,
    },
  ];

  return (
    <>
      <BaseCard
        title="Real-time location"
        subtitle="Where is the patient at any moment."
      >
        <MapServer
          patient={user?.id}
          doctor={user?.patient?.primary_doctor?.id}
        />
      </BaseCard>

      <div className="row">
        {data.map((card, index) => (
          <div className="col-md-6" key={index}>
            <DataCard
              icon={card.icon}
              title={card.title}
              content={card.content}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PatientRealTimeLocationCard;
