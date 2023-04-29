<template>
  <div id="app">
    <br>
    <nav-esq></nav-esq>
    <router-view/>
  </div>
  <div class="main">
   <h3>Listagem de comandas</h3>
   <nav>
   <router-link to="/estoque">Estoque</router-link>
   </nav>
   <router-view/>
 
   <form class="form" >
     <input class="input" v-model="numero" type="text" name="numero" placeholder="Escreva o numero da comanda" />
     <br />
     <input class="input" v-model="itens" type="text" name="itens"  placeholder="Liste os itens da comanda" />
     <br />
     <input class="input" v-model="valor" type="text" name="valor" placeholder="Digite o valor da comanda" />
     <br />
     <button class="submit-button" @click="addComanda">Adicionar comanda</button>
   </form>
   <div class="comanda-container">
     <ul>
       <li v-for="(comanda, i) in comandas" :key="comanda._id">
         <div class="comanda">
         <span class="comanda-numero">{{ comanda.numero }}</span>
         <span class="comanda-itens">{{  comanda.itens }}</span>
         <span class="comanda-valor">{{ comanda.valor }}</span>
       </div>
         <button class="delete-btn" @click="removeComanda(comanda, i)">DELETAR COMANDA</button>
       </li>
     </ul>
   </div>
   </div>
 </template>

<script>

import axios from "axios";
import NavEsq from "./components/NavEsq.vue";

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
  name: "App",
  components:{NavEsq},
  data() {
    return {
      comandas: [],
      numero: "",
      itens: "",
      valor: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/comandaList/");
    this.comandas = response.data;
  },
  methods: {
    async addComanda(e) {
      e.preventDefault();
      const response = await axios.post("api/comandaList/", {
        numero: this.numero,
        valor: this.valor,
        itens: this.itens
      });
      this.comandas.push(response.data);
      this.numero = "";
      this.valor = "";
      this.itens = "";
    },
    async removeComanda(item, i) {
      await axios.delete("api/comandaList/" + item._id);
      this.comandas.splice(i, 1);
    },
  }
};
</script>
<style>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

 h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.submit-button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.comanda-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comanda-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.comanda-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.comanda {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.comanda-numero {
  font-size: 18px;
  font-weight: bold;
}

.comanda-valor {
  max-width: 70%;
  font-size: 14px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}
nav {
  padding: 100px;
}
</style>