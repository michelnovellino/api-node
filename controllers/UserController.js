'use strict'

const UserModel = require('../models/UserModel')
const service = require('../services')

function signUp (req, res) {
  const user = new UserModel({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.avatar = user.gravatar();

  user.save(err => {
    if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
    return res.status(201).send({ message:'usuario creado', token: service.createToken(user) })
  })
}

  
function signIn (req, res) {
  
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.user = user
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });

  }).select('_id email +password');
}

module.exports = {
  signUp,
  signIn
}