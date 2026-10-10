const express = require('express');
const cors = require('cors');
const { createLoanRoutes } = require('./routes/loans');

function createApp({ models }) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Root Health Check
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'online',
      service: 'Perpustakaan Library Loan REST API',
      endpoints: {
        loans: '/loans',
        filter_example: '/loans?status=Terlambat'
      }
    });
  });

  // Mendaftarkan rute /loans
  app.use('/loans', createLoanRoutes(models));

  // Fallback 404
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint tidak ditemukan'
    });
  });

  return app;
}

module.exports = { createApp };