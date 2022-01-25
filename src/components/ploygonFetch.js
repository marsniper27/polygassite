import axios from "axios";

export var url = "https://gasstation-mainnet.matic.network/v2";

export async function fetch(){
    //var feeList = [];
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}