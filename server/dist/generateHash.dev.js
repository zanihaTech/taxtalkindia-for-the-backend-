"use strict";

var bcrypt = require('bcryptjs');

var password = 'Syed@2727';
bcrypt.hash(password, 10, function (err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
//# sourceMappingURL=generateHash.dev.js.map
