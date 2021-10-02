const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const readContacts = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(readContacts);
  } catch (error) {
    return console.log(`listContacts:${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactFilter = contacts.filter(
      (contact) => contact.id === Number(contactId)
    );
    return contactFilter;
  } catch (error) {
    return console.log(`getContactById:${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    );
    contacts.splice(index, 1);
    await fs.writeFile(
      path.join(__dirname, "/db/contacts.json"),
      JSON.stringify(contacts, null, 1)
    );

    return index;
  } catch (error) {
    return console.log(`removeContact:${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "/db/contacts.json"),
      JSON.stringify(contacts, null, 1)
    );

    return newContact;
  } catch (error) {
    return console.log(`addContact:${error}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
