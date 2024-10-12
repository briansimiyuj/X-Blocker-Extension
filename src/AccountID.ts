import { authenticatedX } from "./background"

export const getAccountIDByUsername = async (username: string) =>{

    const URL = `https://api.twitter.com/2/users/by/username/${username}`,

        response = await fetch(

            URL,

            {

                headers:{
                    "Authorization": `Bearer ${authenticatedX}`,
                    "Content-Type": "application/json"  
                }

            }
        
        ),

        data = await response.json()

    
    if(data && data.data && data.data.id){

        console.log(`Account ID: ${data.data.id}`)

        return data.data.id

    }else{

        console.log(`Account ID not found for username: ${username}`)

        return null

    }

}