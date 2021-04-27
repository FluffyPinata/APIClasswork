const express = require("express"), app = express();
router = require("./routes/index");
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscribersController = require("./controllers/subscribersController"),
coursesController = require("./controllers/coursesController"),
usersController = require("./controllers/usersController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"), mongoose = require("mongoose"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
	{useNewUrlParser: true});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(
    express.urlencoded({ 
        extended: false,
    })
);

router.use(express.json());

router.use(cookieParser("my_passwode"));
router.use(expressSession({
	secret: "my_passcode",
	cookie: {
		maxAge: 360000
	},
	resave: false,
	saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

router.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	next();
})

router.use(express.static("public"));
router.use(expressValidator()); 
router.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});