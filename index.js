const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");

//order is important - otherwise "Schema hasn't been registered for model users"
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 Tage
        keys: [keys.cookieKey]
    })
);

//tell passport to use cookies:
app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);

//Dynamic Port Binding for Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//mongodb+srv://manolf:<password>@cluster0.zue2u.mongodb.net/<dbname>?retryWrites=true&w=majority
