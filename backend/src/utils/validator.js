const validateEmployees = (employees) => {
  const emails = new Set();

  for (let emp of employees) {
    if (!emp.Employee_Name || !emp.Employee_EmailID) {
      throw new Error(`Invalid CSV format at row: ${JSON.stringify(emp)}`);
    }

    if (emails.has(emp.Employee_EmailID)) {
      throw new Error("Duplicate email found");
    }

    emails.add(emp.Employee_EmailID);
  }
};

module.exports = { validateEmployees };