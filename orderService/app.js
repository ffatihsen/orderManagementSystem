const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes")

const { errorHandler } = require('./middlewares/errorHandler');

const logger = require('./utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express()
app.use(cors())
app.use(express.json({limit:"2mb"}))
app.use(express.urlencoded({limit:"2mb", extended:true}))

const PORT = process.env.PORT || 8082

app.use((req, res, next) => {
    logger.info('Incoming request', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });
    next();
  });

  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);


app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found." });
});



app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`The server is running successfully at ${PORT}.`);
})