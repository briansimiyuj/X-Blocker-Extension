import { getAccountIDByUsername } from "./AccountID"

document.getElementById("block-button")?.addEventListener("click", () =>{
    
    const usernameInput = document.getElementById("username-input") as HTMLInputElement,
    username = usernameInput.value.trim()
    
    if(username){

        const accountID = getAccountIDByUsername(username)
        
        chrome.runtime.sendMessage({ action: "blockAdultContent", accountID }, (response: { status: string }) =>{

            if(response && response.status === "success"){

                alert(`Account ${username} blocked successfully`)

            }else{

                alert(`Failed to block account ${username}`)

            }
            
        })

    }


})