export const getBearerToken = async () =>{

    const consumerKey = "GA6DX1iLXl7jgxPyrVb6UpmzB",
          consumerSecret = "NraPRNTDO3aSzNNr8qIqhZ1rYQtS5fXXsl8T72vUim7o0Nk0jx",
          URL = "https://api.twitter.com/oauth2/token",

        response = await fetch(

          URL,
          
          {

            method: "POST",

            headers:{

              "Authorization": `Basic ${btoa(consumerKey + ":" + consumerSecret)}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"

            },

            body: "grant_type=client_credentials"

          }

        ),

        data = await response.json()

    return data.access_token

}