const express = require('express');

const router = express.Router();

const {
  generateUniqueId,
  createHyperledgerAdmin,
  generateUniqueIdwithKey,
  registerUser,
  userLogin,
  addAdminUser,
  fetchTotalAPICalls,
  manageUserAccess,
  getAllBlacklistedUser,
  getAllUser,
  getAllAdminUser,
} = require('../../controller/v1/users');

router.post('/addHyperledgerAdmins', createHyperledgerAdmin);
router.post('/registerUser', registerUser);
router.post('/generateUniqueIdwithKey', generateUniqueIdwithKey);
router.post('/login', userLogin);
router.post('/addAdminUser', addAdminUser);
router.post('/manageUserAccess', manageUserAccess);

router.get('/getAllAdminUser', getAllAdminUser);
router.get('/getAllUser', getAllUser);
router.get('/getAllBlacklistedUser', getAllBlacklistedUser);
router.get('/generateUniqueId', generateUniqueId);
router.get('/fetchTotalAPICalls', fetchTotalAPICalls);

module.exports = router;
