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
    
    <h2>Last {{this.fees.length}} block avg base fee: {{this.avgFee}}</h2>
    <button @click="getGas()">Refresh</button>
  
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
      fees:[],
      init:false,
      delay:0
    }
  },
  props: {
    msg: String
  },

  created(){
    if(!this.init){
      this.getGas();
      this.init = true;
    }
  },

  methods:{
    async getGas(){
      try{
        this.currentGas = await polygon.fetch();
        this.safeLow=this.currentGas.safeLow;
        this.standard = this.currentGas.standard;
        this.fast= this.currentGas.fast;
        this.delay = this.currentGas.blockTime*1000;

       this.setDelay();
      }catch(error){
        console.log(error)
      }

    },
    async setDelay(){
      setTimeout(()=>this.getGas(), this.delay)//this.currentGas.blockTime*1000000)
      setTimeout(()=>this.calcAvg(), this.delay)//this.currentGas.blockTime*1000000)
    },
    async calcAvg(){
      var feelength = this.fees.length -1
      if( this.fees.length == 0||this.currentGas.blockNumber > this.fees[feelength].blockNumber){
        try{
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
        _avgFee = (_avgFee/this.fees.length);
      this.avgFee = _avgFee;
        }catch(error){
          console.log("avg error: " +error)
        }
      }
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
