const jwt = require('jsonwebtoken');
const OrgRegistertModel = require('./../model/register');

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodeToken) => {
      if (err) {
        res.status(400).send('INVALID TOKEN');
      } else {
        const id = decodeToken.id;
        try {
          const user = await OrgRegistertModel.findById(id);
          req.orgid = user._id;
          next();
        } catch (err) {
          console.log(err);
          res.status(400).send('ERROR !');
        }
      }
    });
  } else {
      res.status(400).send('INVALID TOKEN');
      next();
  }
};
