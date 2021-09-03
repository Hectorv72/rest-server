const router = require('express').Router();

const { 
    rutaGet, rutaPost, rutaPut, rutaDelete, deleteUser
 } = require('../controllers/user.controllers');

//  Ruta que devuelve todos los usuarios
router.get('/note', rutaGet)

router.post('/note', rutaPost)

// Actualizar usuarios
router.put('/note', rutaPut)

router.put('/deletenote', deleteUser)

router.delete('/note', rutaDelete)

module.exports = router;
