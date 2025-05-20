const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');

// GET /contacts
router.get('/', contactsController.getAll);

// GET /contacts/:id
router.get('/:id', contactsController.getById);

module.exports = router;