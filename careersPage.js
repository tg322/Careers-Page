
//Please do yourself a favour and copy and paste this code into an empty js file in your IDE, everything will make more sense with a bigger view.

function debounce(func, timeout = 300){
    //Defining debounce function as it is undefined for some reason??
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

    document.addEventListener("DOMContentLoaded", function(event) {
        
        window.addEventListener('resize', debounce(responsive, 150));

        let galleryImages = ["/DataFiles/CareerPage/209267/252869/305106_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305107_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305108_600_0.jpg", "/DataFiles/CareerPage/209267/252869/305109_600_0.jpg"];
        

        let isDesktop = null;

        responsive();
        global();

        function responsive(){
            //This function determines what functions to run when the screen meets a certain width requirement. This is to organise and simplify this process.
            const width = window.innerWidth;

            if(width >= 880 && isDesktop !== true){
                isDesktop = true;
                //run desktop function
                desktop()
            }else if(width < 880 && isDesktop !== false){
                isDesktop = false;
                //run mobile function
                mobile();
            }
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
            quoteImage.style.backgroundImage = 'url("/DataFiles/CareerPage/209267/252869/305158_600_0.jpg")';

        }

        function desktop(){
            //This function defines the desktop functions.
            desktopAboutUs();
        }

        function mobile(){
            //This function defines the mobile functions.
            mobileAboutUs();
        }

        function desktopAboutUs(){
            let galleryImageContainers;
            galleryImageContainers = document.getElementsByClassName("galleryImage");
            
            for (let i = 0; i < galleryImageContainers.length; i++) {
            const element = galleryImageContainers[i];
            element.style.backgroundImage = 'url("' + galleryImages[i] + '")';
            element.addEventListener('click', () => showGalleryImages(element));
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
        }

        function mobileAboutUs(){
            let galleryImageContainers;
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
            galleryImageContainers = document.getElementsByClassName("swiperGalleryImage");
            
            for (let i = 0; i < galleryImageContainers.length; i++) {
            const element = galleryImageContainers[i];
            element.style.backgroundImage = 'url("' + galleryImages[i] + '")';
            }
        }
    });