from config.settings import (
    DATE_FORMAT,
    EXTENDED_DATE_FORMAT,
    HOUR_FORMAT
)

from datetime import (
    datetime,
    timedelta,
    time
)

from itertools import product

from django.utils import timezone
from django.db.models import (
    Exists,
    OuterRef,
)

from pulp import (
    LpMinimize,
    LpProblem,
    LpVariable,
    lpSum
)

from appointments.exceptions import AppointmentException

from patients.models import Patient
from schedules.models import Schedule
from appointments.models import Appointment
from doctors.models import Doctor
from rooms.models import Room

from utilities.models import get_id

START_DATE = (datetime.now() + timedelta(days=1)).strftime(DATE_FORMAT)  # Tomorrow
END_DATE = (datetime.now() + timedelta(days=30)).strftime(DATE_FORMAT)  # Next 30 days

MORNING_START_TIME = 9
MORNING_END_TIME = 14
AFTERNOON_START_TIME = 15
AFTERNOON_END_TIME = 21

APPOINTMENT_DURATION = 30  # (minutes)


def solve(sender, data, appointment_instance):
    (
        appointments,
        scheduled_appointments,
        doctors,
        available_doctors,
        rooms,
        medical_specialty_rooms,
        days,
        hours,
        prime_hours
    ) = get_data(sender, data, appointment_instance)

    problem = LpProblem("AppointmentScheduling", LpMinimize)

    # Define the decision variables
    X = LpVariable.dicts(
        "Appointment",
        (
            (appointment, doctor, day, hour, room)
            for appointment in appointments
            for doctor in doctors
            for day in days
            for hour in hours
            for room in rooms
        ),
        cat="Binary"
    )

    """
    Objective Function
    
    Minimize the total time until the appointment is scheduled.
    
    The strategy is to subtract the current time from each possible appointment time (all in minutes), then choose the 
    one with the smallest positive difference.
    """
    problem += lpSum(
        ((datetime.strptime(f"{day} {hour}", EXTENDED_DATE_FORMAT) - datetime.now()).total_seconds() / 60)
        *
        X[appointment, doctor, day, hour, room]
        for appointment in appointments
        for doctor in doctors
        for day in days
        for hour in hours
        for room in rooms
    )

    """
    Scheduled Appointments Restriction
    
    Each scheduled appointment must have its corresponding variable set to 1, as it is already confirmed.
    """
    for appointment, doctor, day, hour, room in scheduled_appointments:
        problem += X[appointment, doctor, day, hour, room] == 1

    """
    Appointment Doctor Assignment Restriction
    
    An appointment cannot be assigned to more than one doctor at a time.
    """
    for appointment in appointments:
        problem += (
                lpSum(
                    X[appointment, doctor, day, hour, room]
                    for doctor in available_doctors
                    for day in days
                    for hour in hours
                    for room in rooms
                ) == 1
        )

    """
    Doctor Availability Restriction
        
    A doctor cannot be assigned to more than one appointment at a time (a doctor cannot be in two places at once).        
    """
    for doctor in available_doctors:
        for day in days:
            for hour in hours:
                problem += (
                        lpSum(
                            X[appointment, doctor, day, hour, room]
                            for appointment in appointments
                            for room in rooms
                        ) <= 1
                )

    """
    Hour Preference Restriction
    
    The appointment must be scheduled within the preferred time range.
    """
    problem += (
            lpSum(
                X[get_id(appointment_instance), doctor, day, hour, room]
                for doctor in available_doctors
                for day in days
                for hour in hours
                for room in rooms
                if hour not in prime_hours
            ) == 0
    )

    """
    Appointment Medical Specialty-Based Room Assignment Restriction
        
    Each appointment must be assigned to a room that matches its medical specialty.
    """
    for room in rooms:
        if room not in medical_specialty_rooms:
            problem += (
                    lpSum(
                        X[appointment, doctor, day, hour, room]
                        for appointment in appointments
                        for doctor in available_doctors
                        for day in days
                        for hour in hours
                    ) == 0
            )

    """
    Room Availability Restriction
    
    A room cannot be assigned to more than one appointment at a time (a room cannot be in two places at once).
    """
    for room in rooms:
        for day in days:
            for hour in hours:
                problem += (
                        lpSum(
                            X[appointment, doctor, day, hour, room]
                            for appointment in appointments
                            for doctor in available_doctors
                        ) <= 1
                )

    problem.solve()

    if problem.status != 1:
        raise AppointmentException("The appointment could not be assigned. Please, try again later.")

    handle_result(sender, X, appointment_instance, available_doctors, days, hours, rooms)


def get_date_range():
    """
    Prepare the date range in which to search for the appointment.

    Returns:
        - start_date (datetime): The start date of the range.
        - end_date (datetime): The end date of the range.
        - days (list): A list of strings representing each day in the range in "YYYY-MM-DD" format.
    """
    start_date = datetime.strptime(START_DATE, DATE_FORMAT)
    end_date = datetime.strptime(END_DATE, DATE_FORMAT)

    days = [
        (start_date + timedelta(days=index)).strftime(DATE_FORMAT)
        for index in range((end_date - start_date).days + 1)
    ]

    return start_date, end_date, days


def get_time_range(time_preference):
    """
    Prepare the time range in which to search for the appointment.

    Args:
        - time_preference (int): The time preference for the appointment (0: no preference, 1: morning, 2: afternoon).
    Returns:
        - hours (list): A list of strings representing the available appointment hours.
        - prime_hours (list): A list of strings representing the preferred appointment hours.
    """
    morning_hours = [
        f"{h:02}:{m:02}"
        for h in range(MORNING_START_TIME, MORNING_END_TIME)
        for m in range(0, 60, APPOINTMENT_DURATION)
    ]

    afternoon_hours = [
        f"{h:02}:{m:02}"
        for h in range(AFTERNOON_START_TIME, AFTERNOON_END_TIME)
        for m in range(0, 60, APPOINTMENT_DURATION)
    ]

    hours = morning_hours + afternoon_hours

    prime_hours = [hours, morning_hours, afternoon_hours][time_preference]

    return hours, prime_hours


def get_scheduled_appointments():
    appointments = Appointment.objects.filter(status__in=[Appointment.STATUS_SCHEDULED, Appointment.STATUS_IN_PROGRESS])
    scheduled_appointments = []

    for appointment in appointments:
        scheduled_appointments.append((
            str(appointment.id),
            str(appointment.doctor.id),
            appointment.schedule.start_time.strftime(DATE_FORMAT),
            appointment.schedule.start_time.strftime(HOUR_FORMAT),
            str(appointment.room.id)
        ))

    return scheduled_appointments


def get_doctors():
    doctors = get_id(Doctor.objects.all())

    if not doctors:
        raise AppointmentException("No doctors available at this time. Please, try again later.")

    return doctors


def get_available_doctors(sender, medical_specialty, start_date, end_date):
    def has_availability_in_range(doctor, range_start, range_end, slot_duration):
        duration = timedelta(minutes=slot_duration)

        schedules = Schedule.objects.filter(
            doctor=doctor,
            end_time__gt=range_start,
            start_time__lt=range_end,
            appointments__status__in=[Appointment.STATUS_SCHEDULED, Appointment.STATUS_IN_PROGRESS]
        ).order_by('start_time')

        last_end = range_start
        for schedule in schedules:
            if schedule.start_time > last_end + duration:
                return True
            last_end = max(last_end, schedule.end_time)

        return range_end > last_end + duration

    # Patient does not select a medical specialty when requesting an appointment
    if Patient.objects.filter(id=sender).exists() and medical_specialty is None:
        doctors = Doctor.objects.filter(patients__id=sender)
    else:
        doctors = Doctor.objects.filter(medical_specialties=medical_specialty)

    # Doctors without commitments spanning the entire range
    doctors = doctors.filter(
        ~Exists(
            Schedule.objects.filter(
                doctor=OuterRef('id'),
                start_time__lte=start_date,
                end_time__gte=end_date,
                appointments__status__in=[Appointment.STATUS_SCHEDULED, Appointment.STATUS_IN_PROGRESS]
            )
        )
    )

    available_doctors = []
    tz = timezone.get_current_timezone()
    start_day = start_date.date()
    end_day = end_date.date()

    for doctor in doctors:
        # Check if doctor has no commitments in range (completely free)
        if not Schedule.objects.filter(
                doctor=doctor,
                end_time__gt=start_date,
                start_time__lt=end_date,
                appointments__status__in=[Appointment.STATUS_SCHEDULED, Appointment.STATUS_IN_PROGRESS]
        ).exists():
            available_doctors.append(get_id(doctor))
            continue

        current_day = start_day
        has_availability_in_period = False

        while current_day <= end_day and not has_availability_in_period:
            # Check morning availability
            has_availability_in_period = has_availability_in_range(
                doctor,
                datetime.combine(current_day, time(MORNING_START_TIME), tzinfo=tz),
                datetime.combine(current_day, time(MORNING_END_TIME), tzinfo=tz),
                APPOINTMENT_DURATION
            )

            # If morning availability, break the loop. Else check afternoon availability
            if not has_availability_in_period:
                has_availability_in_period = has_availability_in_range(
                    doctor,
                    datetime.combine(current_day, time(AFTERNOON_START_TIME), tzinfo=tz),
                    datetime.combine(current_day, time(AFTERNOON_END_TIME), tzinfo=tz),
                    APPOINTMENT_DURATION
                )

            current_day += timedelta(days=1)

        if has_availability_in_period:
            available_doctors.append(get_id(doctor))

    if not available_doctors:
        raise AppointmentException("No doctors available at this time. Please, try again later.")

    return available_doctors


def get_rooms():
    rooms = get_id(Room.objects.filter(is_available=True))

    if not rooms:
        raise AppointmentException("No rooms available at this time. Please, try again later.")

    return rooms


def get_medical_specialty_rooms(doctor_id):
    medical_specialty = (
        Doctor.objects.get(id=int(doctor_id))
        .medical_specialties
        .first()
    )

    medical_specialty_rooms = get_id(
        Room.objects.filter(
            medical_specialty=medical_specialty,
            is_available=True
        )
    )

    if not medical_specialty_rooms:
        raise AppointmentException("No rooms available at this time. Please, try again later.")

    return medical_specialty_rooms


def get_data(sender, data, appointment):
    """
    Prepare the data needed for the appointment scheduling algorithm.

    Args:
        - sender (int): The ID of the person who requested the appointment.
        - data (dict): A dictionary containing the appointment request details with the following keys:
            - time_preference (int): The preferred time slot for the appointment (0: no preference, 1: morning,
            2: afternoon).
            - medical_specialty (int, optional): The ID of the medical specialty for the appointment. Defaults to None.
            - patient (int, optional): The ID of the patient requesting the appointment. Defaults to None.
            - reason (str): The reason for the appointment.
        - appointment (Appointment): The appointment instance.

    Returns:
        tuple (tuple): A tuple containing the following elements:
            - current_appointment (int): The ID of the current appointment being scheduled.
            - appointments (list): A list of appointment IDs that have been scheduled.
            - scheduled_appointments (list): A list of tuples with details of scheduled appointments in the form
            (appointment_id, doctor_id, start_time, start_time_hour, room_id).
            - doctors (list): A list of all doctor IDs in the system.
            - available_doctors (list): A list of available doctor IDs that match the criteria.
            - rooms (list): A list of available room IDs for general use.
            - medical_specialty_rooms (list): A list of room IDs reserved for the specified medical specialty.
            - days (list): A list of strings representing each day in the range in "YYYY-MM-DD" format.
            - hours (list): A list of strings representing the available appointment hours.
            - prime_hours (list): A list of strings representing the preferred appointment hours.
    """
    time_preference = data.pop("time_preference", 0)
    medical_specialty = data.get("medical_specialty", None)

    start_date, end_date, days = get_date_range()
    hours, prime_hours = get_time_range(time_preference)

    scheduled_appointments = get_scheduled_appointments()
    appointments = [get_id(appointment)] + [
        scheduled_appointment[0]
        for scheduled_appointment in scheduled_appointments
    ]
    doctors = get_doctors()
    available_doctors = get_available_doctors(sender, medical_specialty, start_date, end_date)
    rooms = get_rooms()
    medical_specialty_rooms = get_medical_specialty_rooms(available_doctors[0])

    return (
        appointments,
        scheduled_appointments,
        doctors,
        available_doctors,
        rooms,
        medical_specialty_rooms,
        days,
        hours,
        prime_hours
    )


def handle_result(sender, X, appointment, available_doctors, days, hours, rooms):
    """
    Handle the results of the scheduling algorithm updating the appointment instance.

    Args:
        - sender (int): The ID of the person who requested the appointment.
        - X (dict): The decision variables of the scheduling algorithm.
        - appointment (Appointment): The appointment instance to be updated.
        - available_doctors (list): A list of available doctor IDs that match the criteria.
        - days (list): A list of strings representing each day in the range in "YYYY-MM-DD" format.
        - hours (list): A list of strings representing the available appointment hours.
        - rooms (list): A list of available room IDs for general use.
    """
    combinations = product(available_doctors, days, hours, rooms)

    result = next(
        (
            (doctor, day, hour, room)
            for doctor, day, hour, room in combinations
            if X[get_id(appointment), doctor, day, hour, room].varValue == 1
        ),
        None
    )

    doctor, day, hour, room = result

    doctor = Doctor.objects.get(id=int(doctor))
    start_time = datetime.strptime(f"{day} {hour}", EXTENDED_DATE_FORMAT)

    appointment.doctor = doctor
    appointment.schedule = Schedule.objects.create(
        doctor=doctor,
        start_time=start_time,
        end_time=start_time + timedelta(minutes=APPOINTMENT_DURATION)
    )
    appointment.room = Room.objects.get(id=int(room))
    appointment.medical_specialty = None if Patient.objects.filter(id=sender).exists() else doctor.medical_specialties.first()
    appointment.status = Appointment.STATUS_SCHEDULED

    appointment.save()
