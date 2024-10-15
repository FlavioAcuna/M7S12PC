const express = require("express");
const app = express();
const port = 3000;
const userController = require("../controllers/user.controller");
const bootcampController = require("../controllers/bootcamp.controller");

const users = [
  {
    firstName: "Mateo",
    lastName: "Díaz",
    email: "mateo.diaz@correo.com",
  },
  {
    firstName: "Santiago",
    lastName: "Mejías",
    email: "santiago.mejias@correo.com",
  },
  {
    firstName: "Lucas",
    lastName: "Rojas",
    email: "lucas.rojas@correo.com",
  },
  {
    firstName: "Facundo",
    lastName: "Fernandez",
    email: "facundo.fernandez@correo.com",
  },
];
const bootcamps = [
  {
    title: "Introduciendo El Bootcamp De React. ",
    cue: "10",
    description:
      "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
  },
  {
    title: "Bootcamp Desarrollo Web Full Stack.",
    cue: "12",
    description:
      "Crearás aplicaciones web utilizandolas tecnologías y lenguajes más actuales y populares, como:JavaScript, nodeJS, Angular,MongoDB, ExpressJS.",
  },
  {
    title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
    cue: "18",
    description:
      "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados ",
  },
];

app.use(express.json());
//endpoint para crear usuario
app.post("/user", async (req, res) => {
  userController.createUser(req, res);
});
//endpoint para listar todos los usuarios
app.get("/users", async (req, res) => {
  userController.findAll(req, res);
});
//endpoint para mostrar bootcamps asignados a un usuario
app.get("/users/:user_id", async (req, res) => {
  userController.findUserById(req, res);
});
//endpoint para actualizar datos de un usuario
app.put("/user/:id", async (req, res) => {
  userController.updateUserById(req, res);
});
//endpoint para elimnar a un usuario
app.delete("/user/:id", async (req, res) => {
  userController.deleteUserById(req, res);
});
//endpoint mostrar los bootcamps por id
app.get("/bootcamp/:id", async (req, res) => {
  bootcampController.findById(req, res);
});
//endpoint crear un bootcamp
app.post("/bootcamp", async (req, res) => {
  bootcampController.createBootcamp(req, res);
});
//endpoint agregar un usuario al bootcamp
app.post("/bootcamp/:bootcamp_id/:user_id", async (req, res) => {
  bootcampController.addUser(req, res);
});
//endpoint agregar un usuario al bootcamp
app.get("/bootcamps", async (req, res) => {
  bootcampController.findAll(req, res);
});

app.listen(port, () => {
  console.log("El servidor está corriendo en el puerto 3000");
});

function cargarDatos() {
  //agregar los usuarios
  users.forEach(async (user) => {
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Usuario Creado:", data);
    } else {
      console.error("Error al crear usuario:", response.statusText);
    }
  });

  //agregar los bootcamps

  bootcamps.forEach(async (bootcamp) => {
    const response = await fetch("http://localhost:3000/bootcamp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bootcamp),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("bootcamp Creado:", data);
    } else {
      console.error("Error al crear bootcamp:", response.statusText);
    }
  });
}
cargarDatos();

