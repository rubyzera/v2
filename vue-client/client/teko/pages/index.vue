<template>
  <!-- <div id="app">
    <br>
    
  </div> -->
  <div class="main">
    Usuário Logado
    <b-avatar></b-avatar>
   <h3>Listagem de comandas</h3>
   <form class="form" >
     <input class="input" v-model="numero" type="text" name="numero" placeholder="Escreva o numero da comanda" />
     <br />
     <input class="input" v-model="itens" type="text" name="itens"  placeholder="Liste os itens da comanda" />
     <br />
     <input class="input" v-model="valor" type="text" name="valor" placeholder="Digite o valor da comanda" />
     <br />
     <b-button v-b-modal.modal-sm variant="outline-primary" @click="addComanda">Adicionar comanda</b-button>
     <b-modal id="modal-sm" size="sm" title="Sucesso">Comanda Adicionada</b-modal>
   </form>
   <div class="comanda-container">
     <ul>
       <li v-for="(comanda, i) in comandas" :key="comanda.numero">
         <div class="comanda">
         <span class="comanda-numero">{{ comanda.numero }}</span>
         <span class="comanda-itens">{{  comanda.itens }}</span>
         <span class="comanda-valor">{{ comanda.valor }}</span>
       </div>
         <b-button variant="danger" class="mb-2" @click="removeComanda(comanda, i)">
          <b-icon icon="x-circle" variant="danger"></b-icon>DELETAR COMANDA</b-button>
       </li>
     </ul>
   </div>
   </div>
 </template>

<script>


// import axios from "axios";


// axios.defaults.baseURL = 'http://localhost:3000/';

// export default {
export default {
  name: "App",
  data() {
    return {
      comandas: [],
      numero: "",
      itens: "",
      valor: "",
    };
  },
  async mounted() {
    const response = await this.$axios.$get("api/comandaList/");
    console.log(response);
    this.comandas = response;
  },
  methods: {
    async addComanda(e) {
      e.preventDefault();
      const response = await this.$axios.$post("api/comandaList/", {
        numero: this.numero,
        valor: this.valor,
        itens: this.itens
      });
      this.comandas = (await this.$axios.$get()).comandas;
      // this.comandas.push(response.data);
      this.numero = "";
      this.valor = "";
      this.itens = "";
    },
    async removeComanda(item, i) {
      const response = await $axios.$delete("api/comandaList/" + item._id);
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