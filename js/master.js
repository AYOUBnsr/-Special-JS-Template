// check if there's local storage color option 
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null ) {
    // console.log('local storage is not empty')
    document.documentElement.style.setProperty('--main--color', localStorage.getItem("color_option"));

    // remove active class  from all colors list item
    document.querySelectorAll(".colo-list li").forEach(element =>{
        element.classList.remove("active");

    // add active class element with data-color === local storage item
    if (element.dataset.color === mainColors ){
        // add class list
        element.classList.add("active");
    }    
    });

}

// varibale to controle the interval
let theInterval;

// random background option
let backgroundOption = true;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random back local storage is not empty
if (backgroundLocalItem !== null){

    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    }
    else {
        backgroundOption = false;
    }

    // remove active class from spans
    document.querySelectorAll(".random-backgrounds span").forEach(e => {
        e.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// toggle spin class on icon
document .querySelector(".toggle-settings .fa-gear").onclick = function () {
    
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    // toggle class open  on main box
    document.querySelector(".settings").classList.toggle("open");
};
// toggle spin class on icon

// switch colors
const colorList = document.querySelectorAll(".colo-list li");

colorList.forEach(li => {
    li.addEventListener("click", (e) =>{
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color)

        handleActive(e);
    });
});
// switch colors

// switch random background option 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => {
    span.addEventListener("click", (e) =>{


        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem("background_option", true);
        }
        else {
            backgroundOption = false;
            clearInterval(theInterval);

            localStorage.setItem("background_option", false);
        }
    });
});
// switch random background option

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["1.png","2.png","3.png","4.png","5.png"];



// Function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true) {
        

        theInterval = setInterval(() => {
            // get random number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // change background image url
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 4000);
    }
}

randomizeImgs()
// select landing page element


// skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // skills offset top
    let skillsOffsetTop = ourSkills .offsetTop;
    

    // skills outer height
    let skillOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight

    // window scroll top
    windowScrollTop = this.pageYOffset;
    
    if (windowScrollTop > (skillsOffsetTop + skillOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-prog span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progres;
        });
    }
};

// creat popup with Image  
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
    img.addEventListener('click', (e) => {

        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className ='popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay)


        // create the popup box
        let popupBox = document.createElement("div");

        // add class to the popup box
        popupBox.className ='popup-box'

        if (img.alt !== null) {
            //create heading
            let imgHeading =  document.createElement("h3");

            //create text for heading
            let imgText = document.createTextNode(img.alt);

            // append
            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        // create img
        let popupImage = document.createElement('img');

        // set img src
        popupImage.src = img.src;

        // add img to popub box
        popupBox.appendChild(popupImage);

        // append to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //create close button
        let closeButtonText = document.createTextNode("X");

        //append
        closeButton.appendChild(closeButtonText);

        //add class
        closeButton.className = 'close-but'

        //add to popup
        popupBox.appendChild(closeButton)
    })
});

//close popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-but') {
        
        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
})

// select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) =>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
// select all links
const allLinks = document.querySelectorAll('.links a');


function scrollTo(element) {
    allLinks.forEach(ele => {
        ele.addEventListener("click", (e) =>{
    
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
// scrollTo(allBullets);
scrollTo(allLinks);

// handle active state
function handleActive(ev) {
     // remove active class  from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });

    // add active class
    ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalS = localStorage.getItem(".bullets-option");

if (bulletLocalS !== null) {
    bulletsSpan.forEach(span => {

        span.classList.remove('active')
    });

    if (bulletLocalS === 'block') {


        bulletsContainer.style.display = 'block'

        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{

        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletsSpan.forEach(span =>{

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem(".bullets-option", 'block');

            document.querySelector(".bullets-option .yes").classList.add("active");
        }
        else{
            bulletsContainer.style.display = 'none'
            localStorage.setItem(".bullets-option", 'none');
            document.querySelector(".bullets-option .no").classList.add("active");
        }

        // handle avtive fonctio
        handleActive(e);
    });
})
// reset button
document.querySelector(".reset").onclick = function name() {
    
    localStorage.clear();

    window.location.reload();


}
//toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleButton.onclick = function (e) {
    //stop propagation
    e.stopPropagation();
    
    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
};

//click anywhere outside to close
document.addEventListener("click", (e) => {
    if (e.target !== toggleButton && e.target !== tLinks) {
        //check if menu is open
        if (tLinks.classList.contains("open")) {
            toggleButton.classList.remove("menu-active");
            tLinks.classList.remove("open");
        }
    }
});
tLinks.onclick = function (e) {
    e.stopPropagation();
}