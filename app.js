import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = 'openuv-dadfrm6iashn4-io';
const API_URL = 'https://api.openuv.io/api/v1/uv';
const GEOCODE_API_URL = 'https://api.positionstack.com/v1/forward';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
  });

app.post("/get-coordinates", async (req, res) => {
    const zipCode = req.body.zipcode;
    try {
        const geocodeResponse = await axios.get(GEOCODE_API_URL, {
            params: {
                access_key: 'ca080d3b73aa9b4443b77a71c029cdd9',
                query: zipCode,
                limit: 1
            }
        });

        const { latitude, longitude } = geocodeResponse.data.data[0];

        const uvResponse = await axios.get(API_URL, {
            headers: {
                'x-access-token': API_KEY
            },
            params: {
                lat: latitude,
                lng: longitude,
                dt: new Date().toISOString()
            }
            
        });
        const uvIndex = uvResponse.data.result.uv;
        let message;
        if(uvIndex >= 3) {
            message = "You should wear some sunscreen today.";
        } else {
            message = "No need for sunscreen today.";
        }
        res.render("index.ejs", { message: `UV Index for zip code ${zipCode}: ${uvIndex}. ${message}` });
    } catch (error) {
        console.error(error);
        res.send("Error retrieving UV Index.");
    }
});


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});