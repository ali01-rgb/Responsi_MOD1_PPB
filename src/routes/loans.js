const { Router } = require('express');
const { createLoanController } = require('../controllers/loans');

function createLoanRoutes(models) {
  const router = Router();
  const controller = createLoanController(models);

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
}

module.exports = { createLoanRoutes };