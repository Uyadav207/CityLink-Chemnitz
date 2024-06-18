const express = require('express');
const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const recovery = require('./routes/accountRecovery');
const apiData = require('./routes/fetchApiData');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/signup', signup);
app.use('/login', login);
app.use('/user', user);
app.use('/account/user', recovery);
app.use('/apis', apiData);
// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: require('../swagger.json'),
  apis: [
    path.join(__dirname, './routes/*.js'), 
    path.join(__dirname, './routes/swagger-annotations.js'),
    path.join(__dirname, './routes/auth-swagger-annotations.js'),
    path.join(__dirname, './routes/api-swagger-annotations.js')
  ], // Adjust the path according to your routes directory
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
