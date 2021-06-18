const express = require('express');
const {
  login,
  profile,
  register,
  postrequest,
  incomingsms,
  outgoingsms,
  getRequests,
  acceptRequest,
  allData,
  logout,
} = require('./../controllers/controllers');
const { requireAuth } = require('./../middleware/auth_meddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', register);
router.post('/incomingsms', incomingsms);
router.post('/outgoingsms', requireAuth, outgoingsms);
router.post('/submit-request', postrequest);
router.post('/accept-request', requireAuth, acceptRequest);
router.get('/profile', requireAuth, profile);
router.get('/all-request', getRequests);
router.get('/all-data', allData);
router.get('/logout', requireAuth, logout);
module.exports = router;
