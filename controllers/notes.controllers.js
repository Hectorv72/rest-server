const ctrlHome = {};
const Note = require("../models/Note");

// Devuelve todos los usuarios de la colección
ctrlHome.rutaGet = async (req, res) => {
  const notes = await Note.find({active: true}); // consulta para todos los documentos

  // Respuesta del servidor
  res.json(notes);
};

// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
  const { tittle, description } = req.body;

  try {
    const note = new Note({ tittle, description });
    await note.save();
    res.json({ msg: "La nota se ah creado satisfactoriamente UwU" });
  } catch (error) {
    console.log("Error al crear un nuevo usuario: ", error);
    res.status(500).json({ msg: "Error al crear nuevo usuario" });
  }
};

// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
  const { tittle, description, id } = req.body;
  try {
    const nuevaNota = { tittle, description };
    const note = await Note.findByIdAndUpdate(id, nuevaNota, { new: true });

    return res.json({
      msg: "Nota actualizada correctamenteee",
      note,
    });
  } catch (error) {
    console.log("Error al actualizar nota: ", error);
    res.status(500).json({ msg: "Error al actualizar nota" });
  }
};
// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
  const { id } = req.body;

  try {
    // Ejecución normal del programa
    await Note.findByIdAndDelete(id);

    return res.json({
      msg: "Nota eliminado correctamente",
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar nota: ", error);
  }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteNote = async (req, res) => {
  const { id } = req.body;
  const note = await Note.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  );

  // Respuesta del servidor
  res.json({
    msg: "Nota eliminado correctamente",
    note,
  });
};

module.exports = ctrlHome;
