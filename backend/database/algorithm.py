import json
from datetime import datetime, time, date

from config.settings import (
    LOCAL_APPS,
    EXCEL_EXTENSION,
    JSON_EXTENSION
)

from django.apps import apps
from django.http import HttpResponse

from openpyxl import Workbook

from doctors.models import Doctor

FILENAME = "database"


def export_database(request_user_id):
    database = {}

    for model in apps.get_models():
        if model._meta.app_label not in LOCAL_APPS:
            continue
        items = []
        for item in model.objects.all():
            item_dict = {}
            for field in item._meta.fields:
                value = getattr(item, field.name)
                if "password" in field.name.lower():
                    continue
                if isinstance(value, (datetime, time, date)):
                    value = value.isoformat()
                if field.is_relation and value is not None:
                    value = str(value)
                item_dict[field.name] = value
            for field in item._meta.many_to_many:
                if "password" in field.name.lower():
                    continue
                item_dict[field.name] = [str(value) for value in getattr(item, field.name).all()]
            items.append(item_dict)
        model_verbose_name = model._meta.verbose_name_plural[:31]
        database[model_verbose_name] = items

    if doctor := Doctor.objects.filter(id=request_user_id).first():
        users_to_delete = set()

        for patient in database.get("Patients", [])[:]:
            if patient["primary_doctor"] == doctor.identity_card_number:
                continue
            database["Patients"].remove(patient)
            users_to_delete.add(patient["id"])
        for item in database.get("Doctors", [])[:]:
            if item["identity_card_number"] == doctor.identity_card_number:
                continue
            database["Doctors"].remove(item)
            users_to_delete.add(item["id"])
        for administrator in database.get("Administrators", [])[:]:
            database["Administrators"].remove(administrator)
            users_to_delete.add(administrator["id"])

        database["users"] = [
            user for user in database.get("users", [])[:] if user["id"] not in users_to_delete
        ]

        database.pop("Addresses", None)

        database["Appointments"] = [
            item for item in database.get("Appointments", [])[:] if item["doctor"] == doctor.identity_card_number
        ]
        database["Schedules"] = [
            item for item in database.get("Schedules", [])[:] if item["doctor"] == doctor.identity_card_number
        ]
        database["Treatments"] = [
            item for item in database.get("Treatments", [])[:] if item["doctor"] == doctor.identity_card_number
        ]
        database["Medical Tests"] = [
            item for item in database.get("Medical Tests", [])[:] if item["doctor"] == doctor.identity_card_number
        ]

    return database


def to_json(database):
    response = HttpResponse(
        json.dumps(
            database,
            ensure_ascii=False,
            indent=2
        ),
        content_type="application/json"
    )
    response["Content-Disposition"] = f"attachment; filename={FILENAME}.{JSON_EXTENSION}"
    return response


def to_excel(database):
    workbook = Workbook()
    workbook.remove(workbook.active)

    for model, items in database.items():
        if not items:
            continue
        sheet = workbook.create_sheet(title=model)
        headers = list(items[0].keys())

        sheet.append(headers)

        for row in items:
            sheet.append(
                [", ".join(map(str, value)) if isinstance(value, list) else value for value in row.values()]
            )

    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f"attachment; filename={FILENAME}.{EXCEL_EXTENSION}"
    workbook.save(response)

    return response

exporter = {
    JSON_EXTENSION: to_json,
    EXCEL_EXTENSION: to_excel
}
