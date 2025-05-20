const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

const getAll = async (req, res) => {
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

const getById = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
};
