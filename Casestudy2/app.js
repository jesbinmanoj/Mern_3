// Task1: initiate app and run server at 3000
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose = require('mongoose');

// MongoDB Atlas connection string (configured via .env or fallback Atlas URI)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@cluster0.mongodb.net/EmployeeDB?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas successfully');
})
.catch((err) => {
    console.error('MongoDB Atlas connection error:', err);
});

// Employee Schema definition
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error retrieving employee list', error: error.message });
    }
});



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Error retrieving employee', error: error.message });
    }
});





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;
        const newEmployee = new Employee({
            name,
            location,
            position,
            salary
        });
        const savedEmployee = await newEmployee.save();
        res.status(200).json(savedEmployee);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Error adding employee', error: error.message });
    }
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const { _id, id, name, location, position, salary } = req.body;
        const targetId = _id || id;
        let updatedEmployee;

        if (targetId) {
            updatedEmployee = await Employee.findByIdAndUpdate(
                targetId,
                { name, location, position, salary },
                { new: true }
            );
        } else {
            updatedEmployee = await Employee.findOneAndUpdate(
                { name },
                { location, position, salary },
                { new: true }
            );
        }

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found for update' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});

// Also handle update with id parameter
app.put(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, location, position, salary },
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee by id:', error);
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Task1: initiate app and run server at 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
