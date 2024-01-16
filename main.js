require("dotenv").config();
const { google } = require("googleapis");
const crypto = require("crypto");
const axios = require("axios").default;
const pairs = ["BTCUSDT", "ETHUSDT"];

async function retrieveOrders(symbol) {
    const baseEndpoint = "https://api.binance.com";
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const timestamp = Date.now();
    const query_string = `symbol=${symbol}&timestamp=${timestamp}`;

    const signature = crypto
        .createHmac("sha256", apiSecret)
        .update(query_string)
        .digest("hex");

    const response = await axios.get(`${baseEndpoint}/api/v3/allOrders`, {
        headers: {
            "X-MBX-APIKEY": apiKey,
        },
        params: {
            symbol: symbol,
            timestamp: timestamp,
            signature: signature
        }
    });
    return response.data;
}

async function updateSpreadsheet(values) {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const authClient = await auth.getClient();
    const client = await google.sheets({
        version: "v4",
        auth: authClient
    });

    client.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: "HistorySheet!A2",
        valueInputOption: "USER_ENTERED",
        resource: {
            values
        }
    });
}

setInterval(function() {
    pairs.forEach(symbol => {
        retrieveOrders(symbol).then(orders => {
            const values = [];
            orders.forEach(order => {
                values.push([order.symbol, new Date(order.time).toLocaleDateString(), order.type, order.side, order.executedQty, `$${order.cummulativeQuoteQty}`, `$${order.price}`, order.time, order.orderId]);
            });
            updateSpreadsheet(values);
        })
    })
}, 2000)