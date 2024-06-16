const username = document.getElementById("name");
const email = document.getElementById("email");
const maxDev = document.getElementById("maxDev");
const planName = document.getElementById("planName");
const joinDate = document.getElementById("joinDate");
const profilePic = document.getElementById("profilePic");
const adminTokenInput = document.getElementById("adminTokenInput");
const devices = document.getElementById("devices");
const logout = document.getElementById("logout");
profilePic.src = "https://res.cloudinary.com/dr0y2usoy/image/upload/v1717700454/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile_rsqzdd.jpg";

const delay = ms => new Promise(res => setTimeout(res, ms));




const getData=async()=>{
    let data = null;

    try{
        data = JSON.parse(localStorage.data);
    }
    catch(e){
        const response = await axios.post('/getData',{});
        if(response.data.success === true){
            data = response.data.data;
            localStorage.setItem("data",JSON.stringify(data))
            console.log(localStorage.data)
            
        }else{
            data = null;
        }
    }

    if(data!=null){
        username.innerText = data.username;
        email.innerText = data.email;
        maxDev.innerText = data.maxDevices;
        planName.innerText = data.planName;
        joinDate.innerText = new Date(data.joinDate).toLocaleDateString();
        profilePic.src = data.picture;
        adminTokenInput.value = data.adminToken;
        devices.innerHTML = ``;

        for(i=1;i<=(data.clientTokens).length;i++){
            devices.innerHTML+=`<div  class="input-group mb-3"><span class="input-group-text groupTitle" onclick="copyToken('${data.clientTokens[i-1].token}','Client${i}')" id="Client${i}">Client${i}</span><input type="text" class="form-control tokenInput"  aria-describedby="basic-addon3" value="${data.clientTokens[i-1].token}" disabled ></div>`
        }
    }

    
}
getData()

logout.addEventListener('click',async()=>{
    const response = await axios.post('/logout',{});
    if(response.data.success === true){
        localStorage.clear()
        window.location.href = "/";
    }
})

const copyToken=async(token,id)=>{
    document.getElementById(id).textContent = "Copied!"
    await delay(200)
    document.getElementById(id).textContent = id;
    navigator.clipboard.writeText(token).then(async() => {
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
}

const copyAdminToken=async()=>{
    const token = document.getElementById("adminTokenInput").value;
    document.getElementById("tokenInputGroup").textContent="Copied!";
    await delay(200)
    document.getElementById("tokenInputGroup").textContent="Token"
    navigator.clipboard.writeText(token).then(async() => {
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
}