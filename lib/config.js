const portNumber = 8000;
const logFormat = "dev";
const sessionOptions = {
    secret: 'bunnyslippers',
    saveUninitialized: false,
    resave: false
};

module.exports = {
    portNumber,
    logFormat,
    sessionOptions
};