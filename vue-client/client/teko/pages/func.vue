<template>
    <!-- <div id="app">
      <br>
      
    </div> -->
    <div class="main">
      Usuário Logado
      <b-avatar></b-avatar>
     <h3>Registro de Funcionários</h3>
     <form class="form" >
       <input class="input" v-model="nome" type="text" name="nome" placeholder="Nome do Funcionário" />
       <br />
       <input class="input" v-model="senha" type="password" name="senha"  placeholder="Senha de acesso" />
       <br />
       <b-button v-b-modal.modal-sm variant="outline-primary" @click="addFunc">Registrar Funcionário</b-button>
       <b-modal id="modal-sm" size="sm" title="Sucesso">Funcionário registrado com sucesso</b-modal>
     </form>
     <div class="func-container">
       <ul>
         <li v-for="(func, i) in funcs" :key="func._id">
           <div class="func">
           <span class="func-nome">{{ func.nome }}</span>
           <span class="func-senha">{{  func.senha }}</span>
         </div>
           <!-- <button class="delete-btn" @click="removefunc(func, i)">Remover do func</button> -->
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
        funcs: [{
          nome:"",
          senha:""
        }],
        
        nome: "",
        senha: "",
      };
    },
    // async mounted() {
    //   const response = await this.$axios.$get("api/funcList/");
    //   console.log(response);
    //   this.funcs = response;
    // },
    methods: {
      async addfunc(e) {
        e.preventDefault();
        const response = await this.$axios.$post("api/funcList/", {
          nome: this.nome,
          senha: this.senha,
        });
        this.funcs = (await this.$axios.$get()).funcs;
        // this.comandas.push(response.data);
        this.nome = "";
        this.senha = "";
      },
      async removefunc(item, i) {
        const response = await $axios.$delete("api/funcList/" + item._id);
        this.funcs.splice(i, 1);
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
  
  .func-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .func-container ul {
    width: 100%;
    list-style: none;
    padding: 0;
  }
  
  .func-container ul li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .func {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    max-width: 250px;
  }
  
  .func-nome {
    font-size: 18px;
    font-weight: bold;
  }
  
  .func-senha {
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