<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
      <div class="gas-stats">
        <div class="speed">
          <div>
            <span>SafeLow</span>
          </div>
          <div>
            <span>Max Priority Fee: {{this.safeLow.maxPriorityFee}}</span>
          </div>
          <div>
            <span>Max Fee: {{this.safeLow.maxFee}}</span>
          </div>
        </div>
        <div class="speed">
          <div>
            <span>Standard</span>
          </div>
          <div>
            <span>Max Priority Fee: {{this.standard.maxPriorityFee}}</span>
          </div>
          <div>
            <span>Max Fee: {{this.standard.maxFee}}</span>
          </div>
        </div>
        <div class="speed">
          <div>
            <span>Fast</span>
          </div>
          <div>
            <span>Max Priority Fee: {{this.fast.maxPriorityFee}}</span>
          </div>
          <div>
            <span>Max Fee: {{this.fast.maxFee}}</span>
          </div>
        </div>
      </div>
    <h2> Estimated Base Fee: {{this.currentGas.estimatedBaseFee}}</h2>
    <h2>Block Time: {{this.currentGas.blockTime}}s</h2>
    <h2>Block number: {{this.currentGas.blockNumber}}</h2>
    <button @click="getGas()">refresh</button>
  
  </div>
</template>

<script>
import * as polygon from "./ploygonFetch.js"
export default {
  name: 'HelloWorld',
  data(){
    return{
      currentGas:null,
      safeLow:null,
      standard:null,
      fast:null,
      blockTime:null
    }
  },
  props: {
    msg: String
  },

  created(){
    this.getGas();
  },

  methods:{
    async getGas(){
      this.currentGas = await polygon.fetch();
      this.safeLow=this.currentGas.safeLow;
      this.standard = this.currentGas.standard;
      this.fast= this.currentGas.fast;
      this.setDelay();
      //this.blockTime = this.currentGas.blockTime;
    },
    async setDelay(){
      setTimeout(this.getGas(), this.currentGas.blockTime*10000)
    }//alert("This message is displayed after " + this.currentGas.blockTime + " seconds!"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.gas-stats::before {
        content: "";
        margin: 10px;
}
.speed{
  flex-grow: 8;
  text-align: center;
  padding-left: 20px;
  font-size: 25px;
}

</style>
