// ! ********************** Setting Box ********************** //

//  check if there's localstorage color option
let mainColors = localStorage.getItem('main_color');

if (mainColors !== null) {

     document.documentElement.style.setProperty('--main-color', mainColors)

     // remove active class from all colors list items
     document.querySelectorAll('.colors-list li').forEach(element => {

          element.classList.remove('active');

          // add active class on element with data-color === localstorage item
          if (element.dataset.color === mainColors) {
               element.classList.add('active');
          }
     })

}

// Random Background Option
let backgroundOption = true

//  variable to control the background interval
let BackgroundInterval;

// check if there's localstorage random background item
let backgroundLocalItem = localStorage.getItem('background_option');

// check if random background local storage not empty
if (backgroundLocalItem !== null) {

     if (backgroundLocalItem === 'true') {
          backgroundOption = true
     } else {
          backgroundOption = false
     }

     // remove active class from all spans
     document.querySelectorAll('.random-background span').forEach(element => {
          element.classList.remove('active')
     })

     if (backgroundLocalItem === 'true') {
          document.querySelector('.random-background .yes').classList.add('active')
     } else {
          document.querySelector('.random-background .no').classList.add('active')

     }

}

// Toggle Spin Class On Icon
document.querySelector('.toggle-setting .fa-gear').onclick = function () {

     // toggle class fa-spin for rotaion on self 
     this.classList.toggle('fa-spin');

     // toggle class open on main setting box 
     document.querySelector('.setting-box').classList.toggle('open');
}

//Switch Colors
const colorsList = document.querySelectorAll('.colors-list li');

// loop in all list items
colorsList.forEach(li => {

     // click on every list items
     li.addEventListener('click', (e) => {

          // set color on root
          document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
          // set color on localstorage
          localStorage.setItem('main_color', e.target.dataset.color);

          handleActive(e);

     })
})

//Switch Random Background option
const randomBackEl = document.querySelectorAll('.random-background span');

// loop in all Spans
randomBackEl.forEach(span => {

     // click on every span
     span.addEventListener('click', (e) => {

          handleActive(e)

          if (e.target.dataset.background === 'yes') {
               backgroundOption = true
               randomizeImgs();
               localStorage.setItem('background_option', true);
          } else {
               backgroundOption = false
               clearInterval(BackgroundInterval)
               localStorage.setItem('background_option', false);

          }

     })
})




// ! ********************** Landing Page ********************** //

// Select Landing Page Element
let landingPage = document.querySelector('.landing-page');

// Get Array Of Imgs
let imgsArray = ['1.jpg', '2.png', '3.jpg', '4.jpg', '5.jpg'];

// function to randomize imgs
function randomizeImgs() {

     if (backgroundOption === true) {
          BackgroundInterval = setInterval(() => {
               // Get Random Number 
               let randomNumber = Math.floor(Math.random() * imgsArray.length);

               // Change Backgroung Image Url
               landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';

          }, 5000);

     }
}

randomizeImgs();

// ! ********************** Our Skills ********************** //

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

     // skills offset top
     let skillsOffsetTop = ourSkills.offsetTop
     // skills outer height
     let skillsOuterHeight = ourSkills.offsetHeight
     // window height
     let windowHeigth = this.innerHeight
     // window scroll top
     let windowScrollTop = this.pageYOffset

     if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeigth) {

          let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

          allSkills.forEach(skill => {
               skill.style.width = skill.dataset.progress
          })


     }
}

// ! ********************** Gallery ********************** //

// create pop up with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

     img.addEventListener('click', (e) => {

          // craete overlay element
          let overlay = document.createElement("div");

          //  add class to overlay 
          overlay.className = 'popup-overlay';

          // append overlay to the body
          document.body.appendChild(overlay);

          // create the pop up box
          let popupBox = document.createElement('div');

          // add class to the popup box
          popupBox.className = 'popup-box';

          if (img.alt !== null) {
               // create heading
               let imgHeading = document.createElement("h3");

               // create text for heading
               let imgText = document.createTextNode(img.alt);

               // append the text to the heading
               imgHeading.appendChild(imgText);

               // append the heading to the popup box
               popupBox.appendChild(imgHeading)

          }

          // create the image
          let popupImg = document.createElement('img');

          // set image src
          popupImg.src = img.src;

          // add img to popup box
          popupBox.appendChild(popupImg);

          // append the popup box to body
          document.body.appendChild(popupBox)

          // crete the close span
          let closeBtn = document.createElement("span");

          // crete the close btn text
          let closeBtnText = document.createTextNode("x")

          // appent tect to close btn
          closeBtn.appendChild(closeBtnText)

          // add class to close btn
          closeBtn.className = 'close-btn'

          // add close btn to the popup box
          popupBox.appendChild(closeBtn);

     });
});

// close popup
document.addEventListener('click', function (e) {
     if (e.target.className == 'close-btn') {
          // remove the current popup
          e.target.parentNode.remove()

          // remove overlay
          document.querySelector(".popup-overlay").remove()
     }
})

// ! ********************** Navigation Bullets ********************** //
// select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullets");

// select all Links
let allLinks = document.querySelectorAll(".links a");

// * handle scroll function
function scrollToSomeWhere(elements) {

     elements.forEach(ele => {
          ele.addEventListener('click', (e) => {
               e.preventDefault();
               document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior: 'smooth'
               })
          })
     })
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// * Handle active function
function handleActive(e) {
     // remove active class from all element
     e.target.parentElement.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
     })
     // add active class on self
     e.target.classList.add('active');
}

// * Show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

     bulletsSpan.forEach(span => {
          span.classList.remove("active");
     });

     if (bulletLocalItem === "block") {
          bulletsContainer.style.display = "block";
          document.querySelector(".bullets-option .yes").classList.add("active");
     } else {
          bulletsContainer.style.display = "none";
          document.querySelector(".bullets-option .no").classList.add("active");

     }
}

bulletsSpan.forEach(span => {

     span.addEventListener("click", (e) => {

          if (span.dataset.display === "show") {

               bulletsContainer.style.display = "block";
               localStorage.setItem("bullets_option", "block");

          } else {

               bulletsContainer.style.display = "none";
               localStorage.setItem("bullets_option", "none");

          }

          handleActive(e);
     })
});

// Reset Options
document.querySelector(".reset-option").onclick = function () {
     // localStorage.clear();
     localStorage.removeItem("main_color");
     localStorage.removeItem("bullets_option");
     localStorage.removeItem("background_option");
     // Reload Window
     window.location.reload();
}

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
     // stop propagation
     e.stopPropagation()
     //  toggle class menu-active on button
     this.classList.toggle("menu-active");
     //  toggle class open on links
     tLinks.classList.toggle("open");

};

//  click any where outside menu and toggle button
document.addEventListener('click', (e) => {
     if (e.target !== toggleBtn && e.target !== tLinks) {
          // check if menu is open
          if (tLinks.classList.contains("open")) {
               //  toggle class menu-active on button
               toggleBtn.classList.toggle("menu-active");
               //  toggle class open on links
               tLinks.classList.toggle("open");
          }
     }
})

// stop propagation on menu
tLinks.onclick = function (e) {
     e.stopPropagation()
}
