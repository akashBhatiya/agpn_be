const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const sharedSession = require("express-socket.io-session");
const connectDB = require("./utils/db/mongoose.js");

const sockethandler = require("./utils/socket");

const userRouter = require("./routes/users");

connectDB();

const app = express();
const httpServer = createServer(app);
const corsOptions = {
    origin: process.env.FRONTEND,
    methods: ["*"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "35mb" }));
app.use(express.json());

const path = __dirname.replace("/src", "/images");
app.use(express.static(path));

const session = require("express-session")({
    secret: process.env.JWT_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
});
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND,
        methods: ["*"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
});
io.on("connection", async (socket) => {
    sockethandler(socket, io);
});
io.use(
    sharedSession(session, {
        autoSave: true,
    })
);

app.use("/users", userRouter);
app.get('/', (req, res) => {
    res.status(200).json({message:"OK AGRIPPON"})
})

const port = process.env.PORT || 3001;

httpServer.listen(port, () =>
    console.log(`Server listening on port ${port}`)
);