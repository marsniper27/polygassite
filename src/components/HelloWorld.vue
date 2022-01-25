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
    
    <h2>Last 500 block avg base fee: {{this.avgFee}}</h2>
  
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
      blockTime:null,
      avgFee:null,
      fees:[]
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
      if(this.fees.length < 500){
        this.fees.push(this.currentGas);
      }
      else if(this.fees.length == 500){
        this.fees.shift();
        this.fees.push(this.currentGas);
      }
      var _avgFee = 0;
      for(let i = 0; i< this.fees.length; i++){
        _avgFee = _avgFee+this.fees[i].estimatedBaseFee;
      }
      _avgFee = _avgFee+this.currentGas.estimatedBaseFee;
      this.avgFee = (_avgFee/this.fees.length);
      
      this.setDelay();
    },
    async setDelay(){
      setTimeout(this.getGas(), this.currentGas.blockTime*10000)
    }
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
