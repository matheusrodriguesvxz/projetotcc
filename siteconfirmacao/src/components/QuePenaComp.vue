<template>
  <button class="button" @click="voltarPagina">
    <svg class="svgIcon" viewBox="0 0 384 512">
      <path
        d="M257.4 470.6c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L47.4 302.6c-12.5-12.5-12.5-32.8 0-45.3l164.7-164.7c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L123.3 256l134.1 134.6z"
      ></path>
    </svg>
  </button>
  <h2>Ah, que pena!</h2>
  <h4>Sentimos muito que não poderá comparecer no evento :(</h4>
  <p>Mas contamos com você da próxima vez!</p>
  <button class="concluido" @click="voltarPagina">Concluído</button>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    voltarPagina() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

/* Estilos básicos */
img {
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
  width: 70px;
}
h2 {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
}
h4 {
  color: white;
  margin-top: 30px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 0px;
  text-align: center;
  font-size: 1rem;
}
p {
  color: white;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  font-size: 0.9rem;
}
.concluido {
  width: 250px;
  height: 40px;
  background-color: white;
  border-radius: 30px;
  color: black;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  margin-bottom: 0px;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(181, 160, 255);
  align-items: center;
}

/* Responsividade */
@media (max-width: 768px) {
  h2 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 0.9rem;
    margin-top: 20px;
  }
  p {
    font-size: 0.8rem;
    margin: 10px 20px;
  }
  .concluido {
    width: 200px;
    height: 35px;
    font-size: 0.9rem;
  }
  .button {
    width: 40px;
    bottom: 47px;
    height: 40px;
  }
  .svgIcon {
    width: 10px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1rem;
  }
  p {
    font-size: 1rem;
  }
  .concluido {
    width: 180px;
    height: 30px;
    font-size: 0.8rem;
  }
  .button button {
    display: flex;
    width: 35px;
    height: 35px;
   position: relative;
   bottom: 50px;
  }
  .svgIcon {
    width: 8px;
  }
}
</style>
