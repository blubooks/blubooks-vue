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
      <div class="cols col-2  sticky-nav border-end">
        <ul class="nav flex-column">
          <NaviNode v-for="node in data.content.sections" :key="node.id" :node="node" :current="currentNavi"  />
        </ul>
        <!--
        <ul class="nav flex-column">
          <li class="nav-item" v-for="item in data.content.sections">
            <router-link :to="{ name: 'section', params: { id: item.id }}" class="nav-link" :class="{ active: item.id ==  $route.params.id }" aria-current="page">{{ item.title }}</router-link>
          </li>          
        </ul>     
        --> 
      </div>
      <div class="cols col-10">
        <div v-if="editContent">
          <div v-if="formError">
              {{formError}}
          </div>
          <div class="mb-3">
            <label for="form-title" class="form-label">Titel</label>
            <input type="text" class="form-control" id="form-title"  v-model="editContent.title">
          </div>
          <div class="mb-3">
            <label for="form-content" class="form-label">Content</label>
            <textarea class="form-control" rows="20" id="form-content" v-model="editContent.content"></textarea>
          </div>      
          <div class="mb-3">
            <button type="button" class="btn btn-primary" @click="saveClick">SAVE</button>

          </div>               
     
        </div>
        <div v-else>
          <button type="button" class="btn btn-primary" @click="editClick">edit</button> <button type="button" class="btn btn-primary" @click="addClick">add</button>
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

    .sticky-nav{        
        position: sticky;
        top:  0px;
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(100vh - 98px );
    }
</style>

<script>
import ClientService from "@/services/client.service";
import EventBus from "@/common/EventBus";
import NaviNode from '@/components/helper/NaviNode.vue'


export default {
  name: "SectionView",
  components: {
    NaviNode
  },  
  data() {
    return {
      new: false,
      hasError: false,
      hasLoaded: false,
      data: "",
      editContent: null,
      formError: null,
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

    findObject(collection, key, value) {
      for (const o of collection) {
        for (const [k, v] of Object.entries(o)) {
          if (k === key && v === value) {
            return o
          }
          if (Array.isArray(v)) {
            const _o = this.findObject(v, key, value)
            if (_o) {
              return _o
            }
          }
        }
      }
    },

    saveClick(){
      if (this.new) {
        ClientService.postSection(this.$route.params.id,  this.editContent).then(
        (response) => {
          if (response.status === 201) {
            this.loadData();
          }
     
        },
        (error) => {
          console.log(error.response.data.error)
          if (error.response && error.response.data && error.response.data.error) {
            this.formError = error.response.data.error.message
            return;
          }
          this.formError =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );        
        return
      }
      ClientService.putSection(this.$route.params.id,  this.editContent).then(
        (response) => {
          if (response.status === 202) {
            this.loadData();
          }
     
        },
        (error) => {
          console.log(error.response.data.error)
          if (error.response && error.response.data && error.response.data.error) {
            this.formError = error.response.data.error.message
            return;
          }
          this.formError =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },    
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
    addClick(){
      this.new = true;
      this.editContent = {}
    },    
    loadData() {
      this.hasLoaded = false;
      this.false = true;

      ClientService.getPageSection(this.$route.params.id).then(
        (response) => {
          this.currentNavi = this.findObject(response.data.content.sections,"id", this.$route.params.id);

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