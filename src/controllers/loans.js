const { validateCreateLoan, validateUpdateLoan } = require('../validation');

function createLoanController(models) {
  return {
    async getAll(req, res) {
      try {
        const { status } = req.query;
        const data = await models.loan.findAll({ status });

        return res.status(200).json({
          success: true,
          total: data.length,
          data
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal mengambil data peminjaman buku',
          error: err.message
        });
      }
    },

    async getById(req, res) {
      try {
        const { id } = req.params;
        const data = await models.loan.findById(id);

        if (!data) {
          return res.status(404).json({
            success: false,
            message: `Data peminjaman dengan ID ${id} tidak ditemukan`
          });
        }

        return res.status(200).json({
          success: true,
          data
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal mengambil detail peminjaman',
          error: err.message
        });
      }
    },

    async create(req, res) {
      try {
        const validation = validateCreateLoan(req.body);
        if (!validation.isValid) {
          return res.status(400).json({
            success: false,
            message: 'Validasi gagal',
            errors: validation.errors
          });
        }

        const { borrower_name, member_code, book_title, loan_date, due_date, status } = req.body;

        const payload = {
          borrower_name,
          member_code,
          book_title,
          loan_date: loan_date || new Date().toISOString().split('T')[0],
          due_date,
          status: status || 'Dipinjam'
        };

        const data = await models.loan.create(payload);

        return res.status(201).json({
          success: true,
          message: 'Peminjaman buku berhasil dicatat',
          data
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menambahkan peminjaman buku',
          error: err.message
        });
      }
    },

    async update(req, res) {
      try {
        const { id } = req.params;
        const existing = await models.loan.findById(id);

        if (!existing) {
          return res.status(404).json({
            success: false,
            message: `Data peminjaman dengan ID ${id} tidak ditemukan`
          });
        }

        const validation = validateUpdateLoan(req.body);
        if (!validation.isValid) {
          return res.status(400).json({
            success: false,
            message: 'Validasi gagal',
            errors: validation.errors
          });
        }

        const { borrower_name, member_code, book_title, due_date, return_date, status } = req.body;
        const payload = {};

        if (borrower_name !== undefined) payload.borrower_name = borrower_name;
        if (member_code !== undefined) payload.member_code = member_code;
        if (book_title !== undefined) payload.book_title = book_title;
        if (due_date !== undefined) payload.due_date = due_date;
        if (return_date !== undefined) payload.return_date = return_date;
        if (status !== undefined) payload.status = status;

        const data = await models.loan.update(id, payload);

        return res.status(200).json({
          success: true,
          message: 'Data peminjaman berhasil diperbarui',
          data
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal memperbarui data peminjaman',
          error: err.message
        });
      }
    },

    async delete(req, res) {
      try {
        const { id } = req.params;
        const existing = await models.loan.findById(id);

        if (!existing) {
          return res.status(404).json({
            success: false,
            message: `Data peminjaman dengan ID ${id} tidak ditemukan`
          });
        }

        await models.loan.delete(id);

        return res.status(200).json({
          success: true,
          message: `Data peminjaman dengan ID ${id} berhasil dihapus`
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menghapus data peminjaman',
          error: err.message
        });
      }
    }
  };
}

module.exports = { createLoanController };