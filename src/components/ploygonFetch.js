import axios from "axios";

const url = "https://gasstation-mainnet.matic.network/v2";

export async function fetch(){
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}