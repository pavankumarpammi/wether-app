const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
 res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{

  //console.log("Post request received "+val);
  const query = req.body.cityName;
  const apikey="f6c7fa12855e4af03c677814988d09a8";
  const units ="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+ apikey+"&units="+units;

  https.get(url,function(response)
  {
  //console.log(response.statusCode);
  response.on("data",function(data)
  {
  const whetherData = JSON.parse(data);
  const desc =whetherData.weather[0].description;
  const temp =whetherData.main.temp;
  const icon =whetherData.weather[0].icon;
  const imgURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png";
  console.log(temp);
  //console.log(pressure);
  res.write("<h1>The temperature in "+ query+" is " +temp +" celsius </h1>")
  res.write(" <h2>The description  of whether "+desc+"</h2>");
  res.write("<img src="+imgURL+">")

  res.send();
  //console.log(whetherData);
  });
  });
  //  res.sendFile(__dirname +"/index.html");


});

app.listen(process.env.PORT||3000,function()
{
  console.log("server is running at 3000");
});
