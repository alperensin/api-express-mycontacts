const CategoriesRepository = require('../repositories/CategoriesRepository');

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
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404: Not Found
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }
}

// Singleton
module.exports = new CategoryController();
