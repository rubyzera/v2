<template>
    <div>
      <b-button v-b-toggle.nav-esq>Navegação</b-button>
      <b-sidebar id="nav-esq" title="Navegação" shadow>
          <b-nav vertical>
              <b-nav-item to="/">Comandas</b-nav-item>
              <b-nav-item to="/estoque">Estoque</b-nav-item>
          </b-nav>
      </b-sidebar>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>