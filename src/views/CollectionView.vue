<template>
  <div class="row">
    <div class="cols col-12">
      <div  v-if="hasError">
        {{ content }}
      </div>
      <div  v-else>
        <div v-if="hasLoaded">
          <h3>Mandant: {{ data.content.collection.title }}</h3>  
          <div v-for="item in data.content.books">
            <router-link :to="{ name: 'book', params: { id: item.id }}">{{ item.title }}</router-link>
          </div>                
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from "@/services/client.service";
import EventBus from "@/common/EventBus";
import { useRoute } from 'vue-router'


export default {
  name: "ClientListView",
  data() {
    return {
      hasError: false,
      hasLoaded: false,
      data: "",
    };
  },
  mounted() {
    const route = useRoute();
    this.hasLoaded = false;
    ClientService.getCollection(route.params.id).then(
      (response) => {
        this.hasLoaded = true;
        this.data = response.data;
      },
      (error) => {
        this.hasError = true;
        this.hasLoaded = true;
        this.data =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();


        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
          return;
        }
        if (error.response && error.response.status === 404) {

        }
        console.log(this.data)

      }
    );
  },
};
</script>