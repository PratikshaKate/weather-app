const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("../src/utils/gecode");
const forecast = require("../src/utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../Templates/Views");
const partialPath = path.join(__dirname, "../Templates/Partials");

const PORT = process.env.PORT || 3000;

app.use(express.static(publicDirPath));

//Setting up handlebars in the express for dynamic pages
app.set("view engine", "hbs");
//Setting up the path for view to a new folder names as Templates
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, resp) => {
  resp.render("index", {
    title: "Main Page",
    name: "Pratiksha",
  });
});

//about
app.get("/about", (req, resp) => {
  resp.render("about", {
    title: "About Me",
    name: "Pratiksha",
    job: "teacher",
    place: "Pune",
  });
});

//help
app.get("/help", (req, resp) => {
  resp.render("help", {
    title: "Help Page",
    name: "Pratiksha",
  });
});

// //app.com
// app.get("", (req, resp) => {
//   //   resp.send("Hello Express");
//   //send html
//   resp.send("<h1></h1>");
// });

//app.com/help
// app.get("/help", (req, resp) => {
//   //   resp.send("Help Page");
//   //Lets send Json data ; when we send an object, express detects it and sends the JSON data
//   resp.send({
//     name: "Pratiksha",
//     age: 27,
//     job: "Teacher",
//   });
// });

// //app.com/help
// app.get("/about", (req, resp) => {
//   //   resp.send("About Page");
//   //Lets send an array of objects
//   resp.send([
//     { name: "Pratiksha" },
//     {
//       name: "Andrew",
//     },
//   ]);
// });

//app.com/weather-info
app.get("/weather-info", (req, resp) => {
  //   resp.send("Weather Info Page");

  if (!req.query.address) {
    return resp.send({ error: "Address required" });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return resp.send({
        error: error,
      });
    }
    forecast(lat, long, (error, forecast) => {
      if (error) {
        return resp.send({
          error: error,
        });
      }
      resp.send({
        forecast: "Its sunny",
        address: req.query.address,
        weather: forecast,
      });
    });
  });
});

//app.com/products
app.get("/products", (req, resp) => {
  if (!req.query.search) {
    return resp.send({ error: "Query string required" });
  }
  console.log(req.query.search);
  console.log(req.query.country);
  resp.send({
    products: [],
  });
});

//Page not found for /help/somethingelse
app.get("/help/*", (req, resp) => {
  resp.render("pagenotfound", {
    title: "404",
    errormessage: "Help article not found",
    name: "Pratiksha",
  });
});

//404 pages = always at the end
app.get("*", (req, resp) => {
  resp.render("pagenotfound", {
    title: "404",
    errormessage: "Page not found",
    name: "Pratiksha",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and ready at port number 3000.");
});
