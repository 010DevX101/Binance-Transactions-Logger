# Binance Transactions Logger
![version](https://img.shields.io/badge/version-1.0.0-yellow)
Open source Binance transactions logger, uses Binance API and Spreadsheets API to log transactions into a Google Spreadsheet.

## Usage
To use the transactions logger, you will have to generate an API key and an API secret on Binance, [this article](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) explains how to do it. You will also need to create a spreadsheet on [Google Spreadsheets](https://spreadsheets.google.com/) and fetch the ID of the spreadsheet from the URL.

Finally, you will have to setup a new project in [Google Cloud](https://console.cloud.google.com/) following the [documentation](https://developers.google.com/workspace/guides/create-project), after making the project, go to [API and services > Library](https://console.cloud.google.com/apis/library) and enable the Sheets API then, setup a service account, download the JSON file and rename it to `credentials.json`.

After generating your API credentials and fetching the spreadsheet ID, inside of the directory in which you saved the repository, make a `.env` file with the following structure:
```env
API_KEY="Your API key here"
API_SECRET="Your API secret here"
SPREADSHEET_ID="Your spreadsheet ID here"
```
