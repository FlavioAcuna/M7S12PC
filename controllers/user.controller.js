const { User, Bootcamp } = require("../models");

// Crear y guardar usuarios
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Bootcamp, as: "bootcamps" }], // Include Bootcamp model
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const findUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {
      include: [{ model: Bootcamp, as: "bootcamps" }], // incluir Bootcamp
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const bootcamps = user.bootcamps;
    return res.status(200).json(bootcamps);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Actualizar usuario por ID
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Capture the id parameter
    const [updated] = await User.update(req.body, {
      where: { id: userId },
    });

    if (!updated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUser = await User.findByPk(req.params.id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { id: userId },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  findAll,
  findUserById,
  updateUserById,
  deleteUserById,
};
