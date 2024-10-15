const { User, Bootcamp } = require("../models");

// Crear y guardar un nuevo Bootcamp
const createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json(bootcamp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Agregar un Usuario al Bootcamp
const addUser = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.bootcamp_id);
    const bp_id = req.params.bootcamp_id;
    const user = await User.findByPk(req.params.user_id);
    const us_id = req.params.user_id;

    if (!bootcamp || !user) {
      return res
        .status(404)
        .json({ message: "Bootcamp o Usuario no encontrado" });
    }

    await bootcamp.addUser(user);

    return res.status(200).json({
      message: `Agregado el usuario id=${us_id} al bootcamp con id=${bp_id}`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Obtener los Bootcamp por id
const findById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: [{ model: User, as: "users" }],
    });

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }

    return res.status(200).json(bootcamp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Obtener todos los Usuarios incluyendo los Bootcamp
const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Bootcamp, as: "bootcamps" }],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
