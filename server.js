'use strict';

const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log('Server up on '+ (process.env.PORT || 3000));
});
