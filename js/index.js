import { getPersonajes, mataPersonajes } from "./funciones.js";

const botonCargarPersonajes = document.querySelector(".cargar-personajes");
const botonMatarFamilia = document.querySelector(".matar-familia");
const inputFamilia = document.querySelector(".familia");
const personajesElemento = document.querySelector(".personajes");
const personajeMolde = document.querySelector(".personaje-dummy");
const mensajeElemento = document.querySelector(".mensaje");

botonCargarPersonajes.addEventListener("click", async () => {
  const personajes = await getPersonajes();
  pintaPersonajes(personajes);
});

botonMatarFamilia.addEventListener("click", async (e) => {
  try {
    const personajes = await mataPersonajes(inputFamilia.value);
    pintaPersonajes(personajes);
  } catch (error) {
    mensajeElemento.textContent = error.message;
  }
});

const borrarPersonajes = () => {
  const hijos = personajesElemento.querySelectorAll(
    ".personaje:not(.personaje-dummy)"
  );
  for (const hijo of hijos) {
    hijo.remove();
  }
};

const pintaPersonajes = (personajes) => {
  borrarPersonajes();
  for (const personaje of personajes) {
    const personajeElemento = personajeMolde.cloneNode(true);
    personajeElemento.classList.remove("personaje-dummy");
    personajeElemento.querySelector(".nombre").textContent = personaje.nombre;
    personajeElemento.querySelector(".apellido").textContent =
      personaje.familia;
    personajeElemento.querySelector(".estado").textContent = personaje.vivo
      ? "vivo"
      : "muerto";
    personajesElemento.append(personajeElemento);
  }
};
