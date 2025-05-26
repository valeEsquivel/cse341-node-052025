const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');

// GET /contacts
router.get('/', contactsController.getAll);

// GET /contacts/:id
router.get('/:id', contactsController.getById);

// CREATE /contact
router.post('/', contactsController.createContact);

// UPDATE /contacts/:id
router.put('/:id', contactsController.updateContact);

// DELETE /contacts/:id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;