import axios from 'axios'

export default createAnAddress = async() =>{
 
   return await axios.get(`https://block.io/api/v2/get_new_address/?api_key=69ac-eaa6-b094-5f0d`)

}