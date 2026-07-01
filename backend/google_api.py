import os
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

SAMPLE_SPREADSHEET_ID = "1LF7OROFhW9u8u20D6AOOduvPSIvl1ff4e5jhemNoIGo"
SAMPLE_RANGE_NAME = "Página1!A1:D100" # pagina e coordenadas da planilha a serem puxadas


def pega_planilha():

    # pega o JSON da variável de ambiente do Render
    creds_info = json.loads(os.environ["GOOGLE_CREDENTIALS"])

    # cria credencial diretamente (sem arquivo)
    creds = service_account.Credentials.from_service_account_info(
        creds_info,
        scopes=SCOPES
    )

    # conecta na API do Google Sheets
    service = build("sheets", "v4", credentials=creds)

    sheet = service.spreadsheets()

    result = sheet.values().get(
        spreadsheetId=SAMPLE_SPREADSHEET_ID,
        range=SAMPLE_RANGE_NAME
    ).execute()

    values = result.get("values", [])

    return values