<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand"><img src="@/assets/droxic-logo.svg" alt=""></router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/jobs" class="nav-link">Jobs</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
  .navbar-brand img{
    width: 50px;
    margin-left: 20px;
  }
</style>
