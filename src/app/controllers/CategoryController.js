const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(request, response) {
    // Listar todas as categorias
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      // 400: Not Found
      return response.status(400).json({ error: 'Invalid category id' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404: Not Found
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    // Criar novo registro
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'This category already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidUUID(id)) {
      // 400: Not Found
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      // 404: Not Found
      return response.status(404).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.update(id, { name });

    response.json(category);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      // 400: Not Found
      return response.status(400).json({ error: 'Invalid category id' });
    }

    await CategoriesRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new CategoryController();
