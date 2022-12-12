<template>
  <div v-if="hasError">
    <div class="row">
      <div class="cols col-12">
        {{ content }}
      </div>
    </div>
  </div>
  <div  v-else>
    <div class="row" v-if="data && data.content">
      <div class="cols col-12">
        <h3>Mandant: {{ data.content.book.title }}</h3>    
      </div>    
      <div class="cols col-3">
        <div v-for="item in data.content.sections">
          <router-link :to="{ name: 'section', params: { id: item.id }}" :class="{ active: item.id ==  $route.params.id }">{{ item.title }}</router-link>
        </div>  
      </div>
      <div class="cols col-9">
        <div v-if="editContent">
          <button type="button" class="btn btn-primary" @click="editClick">SAVE</button>
          <div class="mb-3">
            <label for="form-title" class="form-label">Titel</label>
            <input type="text" class="form-control" id="form-title" placeholder="name@example.com" :value="editContent.title">
          </div>
          <div class="mb-3">
            <label for="form-content" class="form-label">Content</label>
            <textarea class="form-control" id="form-content">{{ editContent.content }}</textarea>
          </div>          
     
        </div>
        <div v-else>
          <button type="button" class="btn btn-primary" @click="editClick">edit</button>
          <h1>{{ data.content.section.title }}</h1>
          <div v-html="data.content.section.content"></div>        
        </div>

 
      </div>
    </div>
  </div>
</template>

<style>
    .active {
      font-weight: bold;
    }
</style>

<script>
import ClientService from "@/services/client.service";
import EventBus from "@/common/EventBus";


export default {
  name: "SectionView",
  data() {
    return {
      hasError: false,
      hasLoaded: false,
      data: "",
      editContent: null,
    };
  },
  watch: {
    '$route.params.id': function(val, oldVal){ // Same
    //'$route.path': function(val, oldVal){
      console.log("changed")
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    editClick(){
      ClientService.getSection(this.$route.params.id).then(
        (response) => {
          this.editContent = response.data;
        },
        (error) => {
          this.editContent =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

        }
      );


    },
    loadData() {
      this.hasLoaded = false;

      ClientService.getPageSection(this.$route.params.id).then(
        (response) => {
          this.editContent = null;
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
  }  
};
</script>