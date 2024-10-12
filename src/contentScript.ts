const adultKeywords = ['pussy', 'titties', 'dick']

const blockAdultPosts = () =>{

    const posts = document.querySelectorAll("article")

    posts.forEach(post =>{

        adultKeywords.forEach(keyword =>{

            if(post?.textContent?.toLowerCase().includes(keyword)){

                post.style.display = "none"

                console.log(`Blocked post containing keyword: ${keyword}`)

            }

        })

    })

}


const observer = new MutationObserver(blockAdultPosts)

observer.observe(document.body, { childList: true, subtree: true })