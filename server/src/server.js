const express = require('express');
const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const recovery = require('./routes/accountRecovery');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/signup', signup);
app.use('/login', login);
app.use('/user', user);
app.use('/account/user', recovery);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});