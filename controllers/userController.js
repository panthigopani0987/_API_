const crudtbl = require('../models/crudtable');

const fs = require('fs');

// Insert data
const insertdata = async (req, res) => {
    try {
        const { name, email, phone, status, created_date, updated_date } = req.body;
        const existingUser = await crudtbl.findOne({ email });
        if (existingUser) {
            return res.json({ status: 0, msg: 'Email Already Exist' });
        }
        else {
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            const insertuser = await crudtbl.create({
                name: name,
                email: email,
                phone: phone,
                image: image,
                status: status,
                created_date: created_date,
                updated_date: updated_date,
            });
            if (insertuser) {
                return res.json({ status: 200, message: "Data inserted successfully" });
            } else {
                return res.status(500).json({ error: "Failed to insert data" });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//view all
const index = async (req, res) => {
    try {
        let viewUser = await crudtbl.find({});
        if (viewUser) {
            return res.json({ status: 200, message: viewUser });
        }
        else {
            return res.status(500).json({ error: "Failed to insert data" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//delete
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let deleteImg = await crudtbl.findById(id);
        console.log(deleteImg);
        if (deleteImg) {
            fs.unlinkSync(deleteImg.image)
            console.log("Image successfully remove");
            let userData = await crudtbl.findByIdAndDelete(id);
            if (userData) {
                return res.json({ status: 1, messege: 'User Delete' });
            }
            else {
                return res.status(500).json({ error: "Failed to Delete data" });
            }
        } else {
            console.log("Image can't remove");
            return false
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


//Update

const updateData = async (req, res) => {
    try {
        const { name, email, phone, status, created_date, updated_date } = req.body;
        let image = "";
        if (req.file) {
            image = req.file.path;
        }
        const user = await crudtbl.findByIdAndUpdate(req.query.id, {
            name: name,
            email: email,
            phone: phone,
            image: image,
            status: status,
            created_date: created_date,
            updated_date: updated_date,
        });
        console.log(user);
        if (user) {
            return res.json({ status: 200, message: 'User Updated' });
        } else {
            return res.status(500).json({ error: "Failed to update user data" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to update user data" });
    }
}

module.exports = {
    index,
    insertdata,
    deleteData,
    updateData
}
