<template>
  <div class="row">
    <div class="cols col-12">
      <h3>Mandanten</h3>        
    </div>
  </div>
  <div class="row" v-if="loaded">
    <div class="cols col-12">        
      <div v-for="item in page.content.clients">
        <router-link :to="{ name: 'client', params: { id: item.id }}">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from "@/services/client.service";
import EventBus from "@/common/EventBus";

export default {
  name: "ClientListView",
  data() {
    return {
      loaded: false,
      page: "",
    };
  },
  mounted() {
    ClientService.getClients().then(
      (response) => {
        this.loaded = true;
        this.page = response.data;

      },
      (error) => {
        this.page =
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