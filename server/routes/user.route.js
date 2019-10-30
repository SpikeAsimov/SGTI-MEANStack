const express = require('express');
const router = express.Router();

router.get('/', users.getUsers);
router.post('/', users.createUser);
router.get('/:id', users.getUser);
router.put('/:id', users.editUser);
router.delete('/:id', users.deleteUser);

module.exports = router;