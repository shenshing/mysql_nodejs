const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dbService = require('./dbservice');
const { response } = require('express');

app.use(cors());                //block incomming request to backend
app.use(express.json());        //send in json format
app.use(express.urlencoded({
    extended: false
}));

app.post('/insert', async(req, res) => {
    // console.log(req.body);
    const { name } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = await db.insertNewName(name);
    // console.log(result);
    try {
        console.log('success');
        res.status(200).json({
            message : 'success'
        })
    } catch (error) {
        console.log(error);
    }
    // result
    //     .then(data => res.json({ success: true }))
    //     .catch(err => console.log(err));

});

app.get('/getAll', async(req, res) => {
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.getAllData();
        
        console.log('query success');
        res.status(200).json({
            data : result
        })
    } catch (error) {
        console.log(error)
    }
});


app.delete('/delete/:id', async(req, res) => {
    // console.log(req,params);
    const { id } = req.params;
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.deleteRowById(id);

        res.status(200).json({
            message: result
        })
    } catch (error) {
        console.log(error);
    }
});

app.patch('/update', async(req, res) => {
    const { id, name } = req.body;;

    // console.log(id + name);
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.editById(name, id);
        res.status(200).json({
            message: result
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT, () => console.log('app is running'));