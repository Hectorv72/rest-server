const ctrlHome = {};
const User = require("../models/User");

// Devuelve todos los usuarios de la colección
ctrlHome.rutaGet = async (req, res) => {
  const users = await User.find({ activo: true }); // consulta para todos los documentos

  // Respuesta del servidor
  res.json(users);
};

// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log("Error al crear un nuevo usuario: ", error);
    res.status(500).json({ msg: "Error al crear nuevo usuario" });
  }
};

// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
  const { username, password, id } = req.body;
  try {
    const nuevoUsuario = { username, password };
    const user = await User.findByIdAndUpdate(id, nuevoUsuario, { new: true });

    return res.json({
      msg: "Usuario actualizado correctamenteee",
      user,
    });
  } catch (error) {
    console.log("Error al actualizar usuario: ", error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};
// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
  const { id } = req.body;

  try {
    // Ejecución normal del programa
    await User.findByIdAndDelete(id);

    return res.json({
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar usuario: ", error);
  }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteUser = async (req, res) => {
  const { id } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );

  // Respuesta del servidor
  res.json({
    msg: "Usuario eliminado correctamente",
    user,
  });
};

module.exports = ctrlHome;
