function validateCreateLoan(body) {
  const { borrower_name, member_code, book_title, due_date } = body;
  const errors = [];

  if (!borrower_name) errors.push('borrower_name wajib diisi');
  if (!member_code) errors.push('member_code wajib diisi');
  if (!book_title) errors.push('book_title wajib diisi');
  if (!due_date) errors.push('due_date wajib diisi');

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (due_date && !dateRegex.test(due_date)) {
    errors.push('Format due_date tidak valid (gunakan YYYY-MM-DD)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateUpdateLoan(body) {
  const { status, due_date, return_date } = body;
  const errors = [];
  const allowedStatuses = ['Dipinjam', 'Kembali', 'Terlambat'];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (status && !allowedStatuses.includes(status)) {
    errors.push(`Status harus salah satu dari: ${allowedStatuses.join(', ')}`);
  }

  if (due_date && !dateRegex.test(due_date)) {
    errors.push('Format due_date tidak valid (gunakan YYYY-MM-DD)');
  }

  if (return_date && !dateRegex.test(return_date)) {
    errors.push('Format return_date tidak valid (gunakan YYYY-MM-DD)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateCreateLoan,
  validateUpdateLoan
};