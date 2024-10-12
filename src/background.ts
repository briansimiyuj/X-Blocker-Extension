/// <reference types="chrome"/>
import { getBearerToken } from "./getBearerToken.js"

chrome.runtime.onInstalled.addListener(() =>{

    console.log('Extension installed')

}) 

export const authenticatedX = async () =>{

    try{

        return await getBearerToken()

    }catch(error){

        console.error('Error getting bearer token:', error)

        throw error
        
    }

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