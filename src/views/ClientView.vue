<template>
    <div class="container">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
  </template>
  
  <script>
  import ClientService from "../services/client.service";
  import EventBus from "../common/EventBus";
  
  export default {
    name: "User",
    data() {
      return {
        content: "",
      };
    },
    mounted() {
      ClientService.getClients().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        }
      );
    },
  };
  </script>