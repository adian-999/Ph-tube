function getTimeString(time){
    const day = parseInt(time / 86400);
    let remainingSec= time% 86400;
    const hour = parseInt(remainingSec/3600);
     remainingSec=time%3600;
    const min = parseInt(remainingSec/60);
     const sec = remainingSec%60;


    return `${day} day ${hour} hour ${min} minute ${sec} second ago`

}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}




const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=>console.log(error))

}


const loadVideos = (searchText="") =>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=>res.json())
    .then((data)=>displayVideos(data.videos))
    .catch((error)=>console.log(error))

}

const loadDetails = async (videoId)=>{
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);



}

const displayDetails = (video)=>{
    
    const detailsContainer= document.getElementById("modal-content");

    detailsContainer.innerHTML =
    `<img src=${video.thumbnail} />

    <p>${video.description}<p/>
    `



    document.getElementById("showModal").click()
}


const loadCategoriesVideos = (id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')

        displayVideos(data.category)
    })
    .catch((error)=>console.log(error))
}

const displayVideos = (videos)=>{
    const videoContainer=document.getElementById('videos');
    videoContainer.innerHTML="";


    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=
        `<div class="flex flex-col mt-24 gap-5 justify-center items-center">
        <img src="icon.png"/>
        <h2 class="text-center text-2xl font-bold text-gray-600">Opppss! No contents is here</h2>
        </div>
        
        `
    }
    else{
        videoContainer.classList.add("grid")
    }



    videos.forEach((video)=>{
        console.log(video);

        const card = document.createElement('div');
        card.classList = "card card-compact   "
        card.innerHTML=
        ` <figure class="h-[200px] relative">
    <img
      src=${video.
        thumbnail
        }
      alt="Shoes" class="h-full w-full object-cover" />

      ${
        video.others.posted_date?.length== 0 ? "" : `<span class=" text-xs absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name}</p>

     ${video.authors[0].verified == true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
    <div>`: ''}

    <p> ${video.others.views}</p>

    <p onclick="loadDetails('${video.video_id}')" class="btn btn-error btn-sm">Details</p>

    
    </div>

  </div>

        `;

        videoContainer.append(card);

    })

}


const displayCategories = (categories)=>{
    const categoryContainer=document.getElementById('c-container')
    categories.forEach((item)=>{
       console.log(item) ;
    //    create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML=
    `<button id="btn-${item.category_id}" onclick= "loadCategoriesVideos(${item.category_id})" class="btn category-btn">
      ${item.category}
    </button>

    `
    categoryContainer.append(buttonContainer);
    })

    

}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);

})


loadCategories();
loadVideos();