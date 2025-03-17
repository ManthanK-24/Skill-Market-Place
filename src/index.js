const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');


// Adding Routes
const individualProviderRoutes = require('./routes/individualProviderRoutes.js');
const companyProviderRoutes = require('./routes/companyProviderRoutes.js');
const individualUserRoutes = require('./routes/individualUserRoutes.js');
const companyUserRoutes = require('./routes/companyUserRoutes.js');
const skillRoutes = require('./routes/skillRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const offerRoutes = require("./routes/offerRoutes.js");
const adminRoutes = require('./routes/adminRoutes');




dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        service: "SkillMarket Version@1.0",
        status: "true",
        time: new Date(),
    });
});



// Use Routes
app.use('/api/individual-providers', individualProviderRoutes);
app.use('/api/company-providers', companyProviderRoutes);

app.use('/api/individual-users', individualUserRoutes);
app.use('/api/company-users', companyUserRoutes);

app.use('/api/skills', skillRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/offers", offerRoutes);
app.use('/api/admin', adminRoutes);



// app.use('/api/operations', operationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
