<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <b-button variant="info" @click="gotoMain">Ir a Main</b-button>
  </div>
</template>

<script>

export default {
  data(){
    return{
      loading:true
    }
  },
  methods:{
    gotoMain(){
      setTimeout(()=>{
        this.$router.push({name:'Main'}).catch((err) => {
          if(err) console.log(`Problem handling something: ${err}.`);
        });
      }, 100);
    }
  },
  components:{
  }
}
</script>