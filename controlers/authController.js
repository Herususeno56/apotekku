const usersmodel = require("../models/usersmodel");
const bcrypt = require("bcryptjs");
const { validation } = require("../middleware/validation");



const search = async (req, res) => {
  const Name = req.query.Name || ""
  const id = req.query.id || ""
  const role = req.query.role || ""
  const order = req.query.order || "asc"
  try {
      const getdata = await usersmodel.findAll({
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

              // Name:{
              
              //      [Op.like]: '%' + Name + '%'
              // },
              role:{
                 [Op.like]: '%' + role + '%'
            },
            //   id:{
            //     //[Op.in]:[Name, id],
            //      [Op.eq]:  id
            // },

              // Name :{
              //     [Op.like]: '%' + Name + '%'
              // }

           },
           //order:[['Name',order]]
      })
      res.json(getdata)
  } catch (error) {
      return res.status(400).send("ERROR !!")
  }
}



const login = async (req, res) => {
  try {
    const Name = req.body.Name;
    const password = req.body.Password;
    const checkLogin = await usersmodel.findOne({
      where: { Name: Name },
    });

    if (!checkLogin) return res.status(400).send("Name Salah");

    const resultLogin = bcrypt.compareSync(password, checkLogin.Password);
    if (!resultLogin) return res.status(400).send("Password Salah");
    return res.send("Berhasil Login !!");
  } catch (error) {
    res.status(400).send("Error !!");
  }
};

const register = async (req, res) => {
  try {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const NIP = req.body.NIP;
    const Password = req.body.Password;
    const role = req.body.role;

    //Validasi User
    const { error } = validation(req.body);
    if (error) return res.status(400).send("ERROR !!!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(Password, salt);

    const users = new usersmodel({
      Name: Name,
      Email: Email,
      NIP: NIP,
      Password: hashedPassword,
      role: role,
    });
    const savedUser = await users.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).send("Error !!");
  }
};

const getData = async (req, res) => {
  try {
    const dataGet = await usersmodel.findAll({});
    res.json(dataGet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const getDataId = async (req, res) => {
  try {
    const id = req.params.id;
    const dataGet = await usersmodel.findOne({
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
    const { Name, Email, NIP, Password, role } = req.body;
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(Password, salt);
    const updateUser = usersmodel.update(
      {
        Name,
        Email,
        NIP,
        Password: hashedPassword,
        role,
      },
      {
        where: { id: id },
      }
    );
    await updateUser;
    res.send("Berhasil Di Update ");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = usersmodel.destroy({
      where: { id: id },
    });
    await deleteUser;
    res.send("Berhasil Dihapus");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("ERROR !!!");
  }
};

module.exports = {
  register,
  login,
  getData,
  getDataId,
  putData,
  deleteData,
  search
};
