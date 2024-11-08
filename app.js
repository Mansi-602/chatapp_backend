const express = require("express");
const routes = require("./routes/index")
const morgan = require("morgan");
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser= require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const app=express();

app.use(
    cors({
      origin: "*",
  
      methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  
      credentials: true, //
  
      //   Access-Control-Allow-Credentials is a header that, when set to true , tells browsers to expose the response to the frontend JavaScript code. The credentials consist of cookies, authorization headers, and TLS client certificates.
    })
  );

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
    session({
      secret: "keyboard cat",
      proxy: true,
      resave: true,
      saveUnintialized: true,
      cookie: {
        secure: false,
      },
    })
  );
app.use(helmet());


if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));

}

const limiter = rateLimit({
    max:3000,
    windowMs: 60 *60 *100,
     message:"Too many request from this IP Please try again in an hour",
});

app.use("/BinkyTalk", limiter);

app.use(express.urlencoded({
    extended:true,
}));

app.use(mongosanitize());

app.use(xss());

app.use(routes);

module.exports =app;

