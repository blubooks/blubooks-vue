<template>
  <div class="row">
    <div class="cols col-12">
      <h3>Mandanten</h3>        
    </div>
  </div>
  <div class="row" v-if="clients">
    <div class="cols col-12">        
      <div v-for="item in clients">
        <router-link :to="{ name: 'client', params: { id: item.id }}">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
  <DialogWrapper :transition-attrs="{name: 'dialog'}"/>  

</template>

<script>
//import ClientService from "@/services/client.service";
//import EventBus from "@/common/EventBus";
import { mapGetters } from "vuex";
//import { alert } from '@/utils/dialog.js';

export default {
  name: "ClientListView",
  data() {
    return {
      loaded: false,
      page: "",
    };
  },
  computed: {
    ...mapGetters(["clients"]),
  },  
  async mounted() {



    this.$store.dispatch("clientList").then(
          () => {
            console.log("test",this.clients)
           // this.$router.push("/");
          },
          (error) => {
            console.log("error",error)
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
    );
    /*
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
    */
  },
};
</script>