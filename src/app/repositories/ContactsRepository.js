const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'André Luiz',
    email: 'alperensin@mail.com',
    phone: '12312312313',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
