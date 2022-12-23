const storage = require("../models/storages");
const {Op} = require('sequelize')


const search = async (req, res) => {
    const Name = req.query.Name || ""
    const id = req.query.id || ""
    const order = req.query.order || "asc"
    try {
        const getdata = await storage.findAll({
             //attributes:[['Name','Name'],['id','ID']],
              where : {

                // [Op.or]:[
                //     {Name : Name},
                //     {id:id}
                // ],

                // [Op.and]:[
                //     {Name : Name},
                //     {id:id}
                // ],

                Name:{
                    //[Op.in]:[Name, id],
                     [Op.like]: '%' + Name + '%'
                },
              //   id:{
              //     //[Op.in]:[Name, id],
              //      [Op.eq]:  id
              // },

                // Name :{
                //     [Op.like]: '%' + Name + '%'
                // }

             },
             order:[['Name',order]]
        })
        res.json(getdata)
    } catch (error) {
        return res.status(400).send("ERROR !!")
    }
}


const postData = async (req, res) => {
  try {
    const { Name } = req.body;
    const apotek = new storage({
      Name,
    });
    await apotek.save();
    res.json(apotek);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const getData = async (req, res) => {
  try {
    const dataGet = await storage.findAll({});
    res.json(dataGet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const getDataId = async (req, res) => {
  try {
    const id = req.params.id;
    const dataGet = await storage.findOne({
      where: { id: id },
    });
    res.json(dataGet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const putData = async (req, res) => {
  try {
    const { Name } = req.body;
    const id = req.params.id;
    const updateStorage = storage.update(
      {
        Name,
      },
      {
        where: { id: id },
      }
    );
    await updateStorage;
    res.send("Berhasil Di Update ");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStorage = storage.destroy({
      where: { id: id },
    });
    await deleteStorage;
    res.send("Berhasil Dihapus");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

module.exports = {
  postData,
  getData,
  getDataId,
  putData,
  deleteData,
  search
};
