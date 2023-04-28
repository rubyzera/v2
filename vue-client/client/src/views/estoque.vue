<template>
    <div class="main">
     <h3>Gerenciador de Estoque</h3>
     <nav>
     <router-link to="/">Comandas</router-link>
     </nav>
     <router-view/>
   
     <form class="form" >
       <input class="input" v-model="nome" type="text" name="nome" placeholder="Escreva o nome do item" />
       <br />
       <input class="input" v-model="quantidade" type="text" name="quantidade"  placeholder="Digite a quantidade do item" />
       <br />
       <button class="submit-button" @click="addEstoque">Adicionar ao estoque</button>
     </form>
     <div class="estoque-container">
       <ul>
         <li v-for="(estoque, i) in estoques" :key="estoque._id">
           <div class="estoque">
           <span class="estoque-nome">{{ estoque.nome }}</span>
           <span class="estoque-quantidade">{{ estoque.quantidade }}</span>
         </div>
           <button class="delete-btn" @click="removeEstoque(estoque, i)">DELETAR ITEM DO ESTOQUE</button>
         </li>
       </ul>
     </div>
     </div>
   </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "App",
    data() {
      return {
        estoques: [],
        nome: "",
        quantidade: "",
      };
    },
    async mounted() {
      const response = await axios.get("api/estoqueList/");
      this.estoques = response.data;
    },
    methods: {
      async addEstoque(e) {
        e.preventDefault();
        const response = await axios.post("api/estoqueList/", {
          nome: this.nome,
          quantidade: this.quantidade
        });
        this.estoques.push(response.data);
        this.nome = "";
        this.quantidade = "";
      },
      async removeEstoque(item, i) {
        await axios.delete("api/estoqueList/" + item._id);
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