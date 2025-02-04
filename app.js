import express from "express";
import axios from "axios";

 const app = express();
 const port = 3000;

 const API_KEY = 'openuv-dadfrm6iashn4-io';
 const API_URL = 'https://api.openuv.io/api/v1/forecast?lat=:lat&lng=:lng&alt=:alt&dt=:dt'


 app.use(express.static("public"));

 app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
 });