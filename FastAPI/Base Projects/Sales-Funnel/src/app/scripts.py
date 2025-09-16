from app.database import get_db
from app.models.models import Form
from app.schemas.schemas import FormSchema


import gspread
from oauth2client.service_account import ServiceAccountCredentials



def append_to_sheet(form_data, spreadsheet_id):
    # Setup credentials and client
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name("path/to/your/credentials.json", scope)
    client = gspread.authorize(creds)

    # Open the sheet by ID
    sheet = client.open_by_key(spreadsheet_id).sheet1  # sheet1 = first tab

    # Prepare the row (order must match your sheet columns)
    row = [
        form_data["name"],
        form_data["email"],
        form_data["phone"],
        form_data["location"],
        form_data["languages"],
        form_data["instagram"],
        form_data["discord"],
        form_data["created_at"]
    ]
    sheet.append_row(row)