function debounce(func, timeout = 300){
  //Defining debounce function as it is undefined for some reason??
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function setImage(selectorType, selectorName, url){
  switch(selectorType){
    case 'id':
      if(!selectorName || !url){
        throw new Error('Both selectorName and url must be defined.');
      }
      let element = document.getElementById(selectorName);
      element.style.backgroundImage = url;
      break;
    case 'class':
      if(!selectorName || !url){
        throw new Error('Both selectorName and url must be defined.');
      }
      let elements;
      elements = document.getElementsByClassName(selectorName);

      for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          element.style.backgroundImage = 'url("' + url[i] + '")';
      }
      break;
    default:
      throw new Error('selectorType must be either "id" or "class".');
  }
}

let statesArray = [];

function states(){
  return{
    new(name, value){
      //check name has been passed
      if(name == null){
        throw new Error('customStateManagement Err: New operation requires the name and value of the new object to be passed.');
      }
      if(statesArray.find(state => state.name === name) != undefined){
        throw new Error('customStateManagement Err: New operation, a state with that name already exists.');
      }
      //create new state
      statesArray.push({name: name, value: value});
      console.log(statesArray);
      return this
    },
    update(name, value){
      //check if name and value have been passed
      if(name == null || value == null){
        throw new Error('customStateManagement Err: Update operation requires the name and value of the new object to be passed.');
      }
      //find the state by name
      let updatedState = statesArray.find(state => state.name === name );
      //if it exists, update the value
      if(updatedState){
        updatedState.value = value;
        console.log(statesArray);
      }else{
        throw new Error('customStateManagement Err: Edit operation could not find state object with name ' + name);
      }
      return this
    },
    remove(name){
      //check name has been passed
      if(name == null){
        throw new Error('customStateManagement Err: Remove operation requires the name and value of the new object to be passed.');
      }
      //locate state in states array
      const i = statesArray.findIndex(state => state.name === name);
      //check it has been found
      if(i === -1){
        throw new Error('customStateManagement Err: Remove operation could not find state object with name ' + name);
      }else{
        //remove it
        console.log(statesArray);
        statesArray.splice(i, 1);
        console.log(statesArray);
      }
      return this
    },
    read(name){
      //check name has been passed
      if(name == null){
        throw new Error('customStateManagement Err: Remove operation requires the name and value of the new object to be passed.');
      }
      let state = statesArray.find(state => state.name === name);
      //check state exists
      if(state === undefined){
        throw new Error('customStateManagement Err: Read operation, a state with that name does not exist.');
      }
      return state.value;
    }

  }
}

states().new('isDesktop',null);
states().new('currentPage', 'welcome');

let galleryImages = ["/DataFiles/CareerPage/209267/252869/305106_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305107_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305108_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305109_600_0.jpg"];

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('resize', debounce(responsive, 150));

  //initialise js
  
  
  global();
  responsive();

  function responsive(){
    const width = window.innerWidth;
    
    if(width >= 880 && states().read('isDesktop') !== true){
      // customStateManagement('update', 'isDesktop', true);
      states().update('isDesktop', true);
      //run desktop function
      desktop()
    }else if(width < 880 && states().read('isDesktop') !== false){
      // customStateManagement('update', 'isDesktop', false);
      states().update('isDesktop', false);
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

function desktopAboutUs(){

  setImage('class', 'galleryImage', ["/DataFiles/CareerPage/209267/252869/305106_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305107_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305108_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305109_600_0.jpg"]);
  let galleryImageContainers;
  galleryImageContainers = document.getElementsByClassName("galleryImage");
  for (let i = 0; i < galleryImageContainers.length; i++) {
  const element = galleryImageContainers[i];
  element.addEventListener('click', showGalleryImages);
  }
}

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

function showGalleryImages(event){
  let element = event.currentTarget;
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

  const menuItems = document.getElementsByClassName('navbar-nav')[0].querySelectorAll('li');
  const pageSections = document.getElementsByClassName('text-component');

  for(let i = 0; i < menuItems.length; i++){
    menuItems[i].addEventListener('click', menuItemClicked);
  }

  for(let i = 0; i < pageSections.length; i++){
    if(menuItems[i]){
      let formattedId = menuItems[i].textContent.trim().replace(/\s+/g, '-').toLowerCase();
      pageSections[i].setAttribute("menu-id", formattedId);
      if(i !== 0){
        pageSections[i].classList.add('hideSection');
      }
    }
  }

  //This function runs once and regardless of screen width e.g setting background images for static single images where responsive html structure does not exist/not used. 
  setImage('id', 'welcomeImage', 'url("/DataFiles/CareerPage/209267/252869/305105.jpg")');
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
      observer: true,
      observeParents: true,
  });

  teacherSwiper = new Swiper('.teacher-benefits-swiper', {
    // Your existing options...
    direction: 'horizontal',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: false,
    autoplay: {
      delay: 4500,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    // Add the observer parameters
    observer: true,
    observeParents: true,
  });


  setImage('class', 'swiperOurMissionImage', ["/DataFiles/CareerPage/209267/252869/305110.jpg", "/DataFiles/CareerPage/209267/252869/305154.jpg", "/DataFiles/CareerPage/209267/252869/305155.jpg", "/DataFiles/CareerPage/209267/252869/305156.jpg"]);

  setImage('id', 'quoteImage', 'url("https://cdn.jsdelivr.net/gh/tg322/Careers-Page/spccRays.svg")');

  setImage('id', 'headTeacherImage', 'url("/DataFiles/CareerPage/209267/252869/305315.jpg")');

  setImage('class', 'teacher-benefits-slide-image', ["/DataFiles/CareerPage/209267/252869/305316_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305644.jpg", "/DataFiles/CareerPage/209267/252869/305649.jpg", "/DataFiles/CareerPage/209267/252869/305650_600_0.jpg", "/DataFiles/CareerPage/209267/252869/306993_600_0.jpg", "/DataFiles/CareerPage/209267/252869/306995_600_0.jpg", "/DataFiles/CareerPage/209267/252869/306996_600_0.jpg", "/DataFiles/CareerPage/209267/252869/306997_600_0.jpg"]);

  setImage('id', 'contact-us-image', 'url("/DataFiles/CareerPage/209267/0/819a1e4a-0b14-4384-8188-d429ffc1a201_600_0.jpg")');

  setImage('id', 'location-map-image', 'url("https://cdn.jsdelivr.net/gh/tg322/Careers-Page@latest/Group%2045.png")');
}

function destroyDesktopEventListeners(){
  let galleryImageContainers;
  galleryImageContainers = document.getElementsByClassName("galleryImage");
  
  for (let i = 0; i < galleryImageContainers.length; i++) {
    let element = galleryImageContainers[i];
    element.removeEventListener('click', showGalleryImages);
  }
}

function menuItemClicked(event){
  let menuID = event.currentTarget.textContent.trim().replace(/\s+/g, '-').toLowerCase();

  if(menuID !== states().read('currentPage')){
    states().update('currentPage', menuID);
    const pageSections = document.getElementsByClassName('text-component');
    for(let i = 0; i < pageSections.length; i++){
      if(pageSections[i].getAttribute("menu-id") === menuID){
        pageSections[i].classList.remove('hideSection');
      }else{
        pageSections[i].classList.add('hideSection');
      }
    }
  }else{
    console.log('same page clicked, do nothing....')
  }
  

  

}