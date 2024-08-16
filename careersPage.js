function debounce(func, timeout = 300){
  //Defining debounce function as it is undefined for some reason??
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

let states = [];

function customStateManagement(operation, name = null, value = null){
  
  switch (operation) {
    case 'new':
      //check name and value have been passed
      if(name == null || value == null){
        throw new Error('customStateManagement Err: New operation requires the name and value of the new object to be passed.');
      }
      //check if the state name is unique
      if(states.find(state => state.name === name) != undefined){
        throw new Error('customStateManagement Err: New operation, a state with that name already exists.');
      }
      //create new state
      states.push({name: name, value: value});
      console.log(states);
      break;
    case 'update':
      //check if name and value have been passed
      if(name == null || value == null){
        throw new Error('customStateManagement Err: Update operation requires the name and value of the new object to be passed.');
      }
      //find the state by name
      let updatedState = states.find(state => state.name === name );
      //if it exists, update the value
      if(updatedState){
        updatedState.value = value;
        console.log(states);
      }else{
        throw new Error('customStateManagement Err: Edit operation could not find state object with name ' + name);
      }
      break;
    case 'remove':
      //check name has been passed
      if(name == null){
        throw new Error('customStateManagement Err: Remove operation requires the name and value of the new object to be passed.');
      }
      //locate state in states array
      const i = states.findIndex(state => state.name === name);
      //check it has been found
      if(i === -1){
        throw new Error('customStateManagement Err: Remove operation could not find state object with name ' + name);
      }else{
        //remove it
        console.log(states);
        states.splice(i, 1);
        console.log(states);
      }
      break;
    case 'read':
      //check name has been passed
      if(name == null){
        throw new Error('customStateManagement Err: Remove operation requires the name and value of the new object to be passed.');
      }
      let state = states.find(state => state.name === name);
      //check state exists
      if(state === undefined){
        throw new Error('customStateManagement Err: Read operation, a state with that name does not exist.');
      }
      //return state
      console.log(state);
      return state;
    // add more cases if necessary
    default:
      throw new Error('customStateManagement Err: Incorrect state operation');
  }

}

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('resize', debounce(responsive, 150));

  //initialise js
  customStateManagement('new', 'isDesktop', null);

  global();

  function responsive(){
    const width = window.innerWidth;
    let isDesktop = customStateManagement('read', 'isDesktop');
    if(width >= 880 && isDesktop.value !== true){
      customStateManagement('edit', 'isDesktop', true);
      //run desktop function
      desktop()
    }else if(width < 880 && isDesktop !== false){
      customStateManagement('edit', 'isDesktop', false);
      //run mobile function
      mobile();
      destroyDesktopEventListeners();
    }
  }
  function desktop(){
    //This function defines the desktop functions.
    desktopAboutUs();
  }
  function mobile(){
    //This function defines the mobile functions.
    mobileAboutUs();
  }
});

function mobileAboutUs(){
  let galleryImageContainers;
  const swiperElement = document.querySelector('.swiper');
  if(!swiperElement.swiper){
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      autoplay: {
         delay: 3500,
       },
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
  
  galleryImageContainers = document.getElementsByClassName("swiperGalleryImage");
  
  for (let i = 0; i < galleryImageContainers.length; i++) {
  const element = galleryImageContainers[i];
  element.style.backgroundImage = 'url("' + galleryImages[i] + '")';
  }
}

function showGalleryImages(element){
  let imageSrc = element.style.backgroundImage;
  imageSrc = imageSrc.slice(imageSrc.indexOf('"')+1, imageSrc.lastIndexOf('"'));
  // Create the parent div
  const parentDiv = document.createElement('div');
  parentDiv.setAttribute("id", "imageView");
  // Apply styles to the parent div
  parentDiv.style.position = 'fixed';
  parentDiv.style.backgroundColor = '#000000b0';
  parentDiv.style.width = '100%';
  parentDiv.style.display = 'flex';
  parentDiv.style.boxSizing = 'border-box';
  parentDiv.style.padding = '0px 20px';
  parentDiv.style.justifyContent = 'center';
  parentDiv.style.alignItems = 'center';
  parentDiv.style.height = '100%';
  parentDiv.style.top = '50%';
  parentDiv.style.left = '50%';
  parentDiv.style.transform = 'translate(-50%, -50%)'; // Centers the div
  parentDiv.style.zIndex = '1000'; // Ensure it appears on top
  parentDiv.addEventListener('click', () => hideGalleryImage());
  // Create the child div
  const childDiv = document.createElement('img');
  
  // Apply styles to the child div
  childDiv.style.position = 'absolute';
  childDiv.style.width = '100%';
  childDiv.style.maxWidth = 'max-content';
  childDiv.style.height = 'auto';
  childDiv.style.maxHeight = '600px'
  childDiv.style.top = '50%';
  childDiv.style.left = '50%';
  childDiv.style.transform = 'translate(-50%, -50%)';
  childDiv.setAttribute('src', imageSrc);
  
  // Append the child div to the parent div
  parentDiv.appendChild(childDiv);
  
  // Append the parent div to the body
  document.body.appendChild(parentDiv);
}

function hideGalleryImage(){
imageViewElement = document.getElementById("imageView");
imageViewElement.remove();

}

function global(){
  //This function runs once and regardless of screen width e.g setting background images for static single images where responsive html structure does not exist/not used. 
  let spccWelcomeImage;
  spccWelcomeImage = document.getElementById("welcomeImage");
  spccWelcomeImage.style.backgroundImage = 'url("/DataFiles/CareerPage/209267/252869/305105.jpg")';
  const swiper = new Swiper('.ourMissionSwiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      autoplay: {
         delay: 3500,
       },
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
  });

  let swiperOurMissionImageUrls = ["/DataFiles/CareerPage/209267/252869/305110.jpg", "/DataFiles/CareerPage/209267/252869/305154.jpg", "/DataFiles/CareerPage/209267/252869/305155.jpg", "/DataFiles/CareerPage/209267/252869/305156.jpg"];
  let swiperOurMissionImageContainers;
  swiperOurMissionImageContainers = document.getElementsByClassName("swiperOurMissionImage");

  for (let i = 0; i < swiperOurMissionImageContainers.length; i++) {
      const element = swiperOurMissionImageContainers[i];
      element.style.backgroundImage = 'url("' + swiperOurMissionImageUrls[i] + '")';
  }

  let quoteImage = document.getElementById("quoteImage");
  quoteImage.style.backgroundImage = 'url("https://cdn.jsdelivr.net/gh/tg322/Careers-Page/spccRays.svg")';

  let HeadTeacherImage = document.getElementById("headTeacherImage");
  HeadTeacherImage.style.backgroundImage = 'url("/DataFiles/CareerPage/209267/252869/305315.jpg")';

}

function destroyDesktopEventListeners(){
  let galleryImageContainers;
  galleryImageContainers = document.getElementsByClassName("galleryImage");
  
  for (let i = 0; i < galleryImageContainers.length; i++) {
  const element = galleryImageContainers[i];
   element.removeEventListener('click', showGalleryImages);
  }
}









