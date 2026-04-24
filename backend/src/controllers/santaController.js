const { parseCSV } = require('../services/csvService');
const { Parser } = require('json2csv');
const { generateAssignments } = require('../services/santaService');
const { validateEmployees } = require('../utils/validator');

const generateSanta = async (req, res) => {
    try {
        const employeeFile = req.files.employees[0].path;
        const prevFile = req.files.previous?.[0]?.path;
        
        console.log("======= req.files ===============");
        console.log(req.files);

        const employees = await parseCSV(employeeFile);
        validateEmployees(employees);

        let prevAssignments = [];
        if(prevFile) {
            prevAssignments = await parseCSV(prevFile);
        }

        const assignments = generateAssignments(employees, prevAssignments);
        const parser = new Parser();
        const csv = parser.parse(assignments);

        res.header('Content-Type', 'text/csv');
        res.attachment('secret_santa.csv');

        return res.send(csv);

    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { generateSanta };