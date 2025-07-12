import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EmptyToolbar = () => null;

export default function CalendarWrapper({ events, onlyDay = false }) {
  const [currentView, setCurrentView] = useState(
    onlyDay ? Views.DAY : Views.MONTH
  );

  return (
    <div style={{ overflow: "hidden", height: "75vh" }}>
      <Calendar
        localizer={localizer}
        events={events ?? []}
        culture="es"
        popup
        defaultView={onlyDay ? Views.DAY : Views.MONTH}
        views={
          onlyDay
            ? [Views.DAY]
            : [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]
        }
        view={currentView}
        onView={setCurrentView}
        components={onlyDay ? { toolbar: EmptyToolbar } : {}}
        eventPropGetter={() => {
          if (
            currentView === Views.DAY ||
            currentView === Views.WEEK ||
            currentView === Views.MONTH
          ) {
            return {
              style: {
                backgroundColor: "#435ebe",
                color: "white",
                paddingInline: "8px",
                fontWeight: "525",
              },
            };
          }
          return {
            style: {
              paddingInline: "8px",
              fontWeight: "525",
            },
          };
        }}
      />
    </div>
  );
}
