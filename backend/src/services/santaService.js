const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateAssignments = (employees, prevAssignments = []) => {
  const maxAttempts = 1000;

  const prevMap = new Map();
  prevAssignments.forEach(p => {
    prevMap.set(p.Employee_EmailID, p.Secret_Child_EmailID);
  });

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffled = shuffle([...employees]);

    let valid = true;
    const result = [];

    for (let i = 0; i < employees.length; i++) {
      const giver = employees[i];
      const receiver = shuffled[i];

      if (
        giver.Employee_EmailID === receiver.Employee_EmailID ||
        prevMap.get(giver.Employee_EmailID) === receiver.Employee_EmailID
      ) {
        valid = false;
        break;
      }

      result.push({
        Employee_Name: giver.Employee_Name,
        Employee_EmailID: giver.Employee_EmailID,
        Secret_Child_Name: receiver.Employee_Name,
        Secret_Child_EmailID: receiver.Employee_EmailID
      });
    }

    if (valid) return result;
  }

  throw new Error("Unable to generate valid assignments after multiple attempts");
};

module.exports = { generateAssignments };