const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

//* Return all contacts from the database.
const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const result = await mongodb.getDB().db().collection("contacts").find();

  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch contacts." });
    });
};

//* This function retrieves a contact by its ID from the database.
const getById = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectID(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection("contacts")
    .find({ _id: contactId });

  result
    .toArray()
    .then((contact) => {
      if (contact.length === 0) {
        return res.status(404).json({ error: "Contact not found." });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contact[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch contact." });
    });
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("contacts")
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the contact.");
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectID(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, updatedContact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while updating the contact.");
  }
}

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDB()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while deleting the contact.");
  }
}

module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
