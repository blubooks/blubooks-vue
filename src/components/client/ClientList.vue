<template>
    <div class="row">
      <div class="cols col-12">
        <h3>Mandanten</h3>        
      </div>
    </div>
    <div class="row">
      <div class="cols col-12">        
        <div v-for="item in content">
          <a href="">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ClientService from "@/services/client.service";
  import EventBus from "@/common/EventBus";
  
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