const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const recovery = require('./routes/accountRecovery');
const apiData = require('./routes/fetchApiData');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/signup', signup);
app.use('/login', login);
app.use('/user', user);
app.use('/account/user', recovery);
app.use('/apis', apiData);

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CityLink API Documentation',
      version: '1.0.0',
      description: 'API documentation for the CityLink Chemnitz',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      BearerAuth: []
    }],
  },
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
