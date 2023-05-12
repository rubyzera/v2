<template>
  <!-- <div id="app">
    <br>
    
  </div> -->
  <div class="main">
    Usuário Logado
    <b-avatar></b-avatar>
   <h3>Controle de Estoque</h3>   
   <form class="form" >
     <input class="input" v-model="nome" type="text" name="nome" placeholder="Nome do Item" />
     <br />
     <input class="input" v-model="quantidade" type="text" name="quantidade"  placeholder="Quantidade" />
     <br />
     <b-button v-b-modal.modal-sm variant="outline-primary" @click="addEstoque">Adicionar ao estoque</b-button>
     <b-modal id="modal-sm" size="sm" title="Sucesso">Item adicionado ao estoque</b-modal>
   </form>
   <div class="estoque-container">
     <ul>
       <li v-for="(estoque, i) in estoques" :key="estoque._id">
         <div class="estoque">
         <span class="estoque-nome">{{ estoque.nome }}</span>
         <span class="estoque-quantidade">{{  estoque.quantidade }}</span>
       </div>
         <!-- <button class="delete-btn" @click="removeEstoque(estoque, i)">Remover do Estoque</button> -->
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
      estoques: [{
        nome:"",
        quantidade:""
      }],
      
      nome: "",
      quantidade: "",
    };
  },
  // async mounted() {
  //   const response = await this.$axios.$get("api/estoqueList/");
  //   console.log(response);
  //   this.estoques = response;
  // },
  methods: {
    async addEstoque(e) {
      e.preventDefault();
      const response = await this.$axios.$post("api/estoqueList/", {
        nome: this.nome,
        quantidade: this.quantidade,
      });
      this.estoques = (await this.$axios.$get()).estoques;
      // this.comandas.push(response.data);
      this.nome = "";
      this.quantidade = "";
    },
    async removeEstoque(item, i) {
      const response = await $axios.$delete("api/estoqueList/" + item._id);
      this.estoques.splice(i, 1);
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

.estoque-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.estoque-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.estoque-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.estoque {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.estoque-nome {
  font-size: 18px;
  font-weight: bold;
}

.estoque-quantidade {
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