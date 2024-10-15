import dotenv from "../node_modules/dotenv/lib/main"

dotenv.config()

export const getBearerToken = async () =>{

    const consumerKey = process.env.twitterConsumerKey,
          consumerSecret = process.env.twitterConsumerSecret,
          URL = "https://api.twitter.com/oauth2/token",

        response = await fetch(

          URL,
          
          {

            method: "POST",

            headers:{

              "Authorization": `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"

            },

            body: "grant_type=client_credentials"

          }

        ),

        data = await response.json()

    return data.access_token

}