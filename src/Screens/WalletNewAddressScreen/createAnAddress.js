import axios from 'axios'

export default createAnAddress = async() =>{
 
   return await axios.get(`https://block.io/api/v2/get_new_address/?api_key=e1d0-4d39-2e4f-6bb6`)

}