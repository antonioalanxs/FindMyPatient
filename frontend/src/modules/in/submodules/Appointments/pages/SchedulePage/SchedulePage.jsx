import { useState, useEffect } from "react";

import { useTitle } from "@/core/hooks/useTitle";
import { appointmentService } from "@/core/services/AppointmentService";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import CalendarWrapper from "@/shared/components/Calendar/Calendar";
import Load from "@/shared/components/Load/Load";

export default function SchedulePage() {
  useTitle({ title: "Schedule" });

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    appointmentService.calendar().then(({ data }) => {
      setAppointments(
        data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      );
    });
  }, []);
  return (
    <>
      <Header
        title="Schedule"
        subtitle="Here you can see your timetable with all your appointments."
      />

      {appointments ? (
        <BaseCard>
          <CalendarWrapper events={appointments} />
        </BaseCard>
      ) : (
        <Load center />
      )}
    </>
  );
}
