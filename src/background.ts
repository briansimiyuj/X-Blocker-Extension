/// <reference types="chrome"/>

chrome.runtime.onInstalled.addListener(() =>{

    console.log('Extension installed')

}) 

const authenticatedX = async () =>{

    const consumerKey = "GA6DX1iLXl7jgxPyrVb6UpmzB",
          consumerSecret = "NraPRNTDO3aSzNNr8qIqhZ1rYQtS5fXXsl8T72vUim7o0Nk0jx"

}


const blockAdultContent = async (accountID: string) =>{

    try{

        const URL = `https://api.twitter.com/2/users/${accountID}/blocked`,
              token = await authenticatedX(), 

            response = await fetch(

                URL,

                {
                    method: "POST",

                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            
            )

        if(!response.ok){

            const errorMessage = await response.json()

            console.log(`Error blocking account: ${errorMessage}`)

            throw new Error(errorMessage.detail || 'Failed to block account')

        }

        const data = await response.json()

        console.log(`Blocked account: ${accountID}`, data)

    }catch(error){

        console.error(`Error blocking account: ${accountID}`, error)

        throw error

    }

}

export { authenticatedX }


chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{

    if(request.action === "blockAdultContent"){

        blockAdultContent(request.accountID)

            .then(() =>{

                sendResponse({ message: 'Account blocked successfully', status: "success" })

            }).catch(error =>{

                console.error('Error blocking account:', error)

                sendResponse({ message: "Error blocking account", status: "error" })

            })

        return true

    }

})