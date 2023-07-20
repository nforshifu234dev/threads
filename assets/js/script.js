// Select the parent container with class 'contents'
const parentDiv = document.querySelector('.contents');

// Select all elements with class 'thread'
const threads = document.querySelectorAll('.thread');

// Variable to keep track of the currently playing video
let currentPlayingVideo = null;

// Variable to track whether the user has interacted with the page
let hasUserInteracted = false;

// Event listener for the scroll event on the parentDiv
parentDiv.addEventListener('scroll', () => {
    
    const scrollTop = parentDiv.scrollTop;
    const scrollHeight = parentDiv.scrollHeight;
    const clientHeight = parentDiv.clientHeight;

    if ( scrollHeight - scrollTop - clientHeight <= 900 )
    {

       const newThreadsContainer = document.querySelector('.new-threads-container');

       document.querySelector('.new-threads-container').classList.add('display-block');

       newThreadsContainer.querySelector(".new-threads").addEventListener('click', ()=>{

            document.querySelector(".feed").scrollIntoView( {
                behavior: "smooth"
            } );

       });

       

    }
    else
    {

       document.querySelector('.new-threads-container').classList.remove('display-block');

    }

  // If the user hasn't interacted, return and do nothing
  if (!hasUserInteracted) return;

  // Get the visible threads on the page
  const visibleThreads = getVisibleThreads();

  // Find the thread that contains a video element
  const threadWithVideo = visibleThreads.find(thread => thread.querySelector('video'));

  if (threadWithVideo) {
    // If a thread with a video is found

    // Get the video element from the thread
    const video = threadWithVideo.querySelector('video');

    video.parentNode.click();

    // If the video is different from the currently playing video, stop all videos, play the new video, and update the currentPlayingVideo variable
    if (video !== currentPlayingVideo) {
      stopAllVideos();
        video.muted = true;
        playVideo(video);
      currentPlayingVideo = video;
    }


  } else {
    // If no thread with a video is found, stop all videos
    stopAllVideos();
  }
});

// Function to get the visible threads on the page
function getVisibleThreads() {
  const visibleThreads = [];

  // Iterate over each thread element
  threads.forEach(thread => {
    // Get the bounding rectangle of the thread element
    const rect = thread.getBoundingClientRect();

    // If the top and bottom of the thread are within the viewport, add it to the visibleThreads array
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      visibleThreads.push(thread);
    }
  });

  return visibleThreads;
}

// Function to play a video
function playVideo(video) {
  // Attempt to play the video
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  video.autoplay = true;
  video.play()
    .catch(error => {
      // If autoplay fails, handle the error
      console.error('Failed to play the video:', error);
    });


}

// Function to stop all videos
function stopAllVideos() {
  // Iterate over each thread element
  threads.forEach(thread => {
    // Get the video element within the thread
    const video = thread.querySelector('video');

    // If the video exists and is not paused, pause it
    if (video && !video.paused) {
      video.pause();
    }
  });

  // Reset the currentPlayingVideo variable
  currentPlayingVideo = null;
}

// Event listener for the click event on the document
function clickEventHandler() {
    // Set hasUserInteracted to true
    hasUserInteracted = true;
  
    // Remove the click event listener after it's triggered
    document.removeEventListener('click', clickEventHandler);
  }
  
  document.addEventListener('click', clickEventHandler);
  

// Get all thread medias within the thread medias container
const allThreadMediaContainers = document.querySelectorAll(".thread-medias-container");

 // Iterate over each media
allThreadMediaContainers.forEach( (threadMediasParentContainer)=>{

    // Container that holds the medias of a single thread
    const threadMediasContainer = threadMediasParentContainer.querySelector('.thread-medias');

    // Get all the media elements in a Thread Media Container
    const allThreadMedias = threadMediasContainer.querySelectorAll('.thread-media');

    // Iterate over all the media found
    allThreadMedias.forEach( (media)=>{

        // Get all video elements within the current media
        let allVideoElement = media.querySelectorAll("video");

        // Get the scroll container with the class "contents"
        let scrollContainer = document.querySelector(".contents");

        // Check if there is at least one video element
        if ( allVideoElement.length >= 1 )
        {

            // Iterate over each video element
            allVideoElement.forEach( (videoElement)=>
            {

                // Create a loading container for the video
                const threadMediaLoadingContainer = document.createElement('div');
                                        threadMediaLoadingContainer.setAttribute('class', 'thread-media-loading');
                                        threadMediaLoadingContainer.innerHTML = " <svg xmlns='http://www.w3.org/2000/svg' class='spin' enable-background='new 0 0 24 24' viewBox='0 0 24 24'><path d='M5.1,16c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4c0.3,0.5,0.9,0.6,1.4,0.4C5.2,17.1,5.3,16.5,5.1,16C5.1,16,5.1,16,5.1,16z M4.7,6.6C4.2,6.4,3.6,6.5,3.3,7C3.1,7.5,3.2,8.1,3.7,8.4C4.2,8.6,4.8,8.5,5.1,8C5.3,7.5,5.2,6.9,4.7,6.6z M20.3,8.4c0.5-0.3,0.6-0.9,0.4-1.4c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4C19.2,8.5,19.8,8.6,20.3,8.4z M4,12c0-0.6-0.4-1-1-1s-1,0.4-1,1s0.4,1,1,1S4,12.6,4,12z M7.2,18.8c-0.5,0.1-0.9,0.7-0.7,1.2c0.1,0.5,0.7,0.9,1.2,0.7c0.5-0.1,0.9-0.7,0.7-1.2C8.3,19,7.8,18.7,7.2,18.8z M21,11c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S21.6,11,21,11z M20.3,15.6c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c0.5,0.3,1.1,0.1,1.4-0.4c0,0,0,0,0,0C20.9,16.5,20.8,15.9,20.3,15.6z M17,3.3c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c0.5,0.3,1.1,0.1,1.4-0.4c0,0,0,0,0,0C17.6,4.2,17.5,3.6,17,3.3z M16.8,18.8c-0.5-0.1-1.1,0.2-1.2,0.7c-0.1,0.5,0.2,1.1,0.7,1.2c0.5,0.1,1.1-0.2,1.2-0.7C17.6,19.5,17.3,19,16.8,18.8z M12,20c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,20,12,20z M12,2c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,2,12,2z'/></svg>";

                // Append the loading container to the current media
                media.appendChild(threadMediaLoadingContainer);

                // Function to check if the video is buffering
                function isVideoBuffering() 
                {
                    
                    videoElement.addEventListener('waiting', ()=>{

                        threadMediaLoadingContainer.style.display = 'flex';

                    });

                }

                // Function to check if the video metadata has loaded
                function hasVideoLoadedMetadata() 
                {
                    videoElement.addEventListener('loadedmetadata', ()=>{

                        threadMediaLoadingContainer.style.display = 'none';

                    });

                }

                // Function to check if the video is playing
                function isVideoPlaying() 
                {
                    
                    videoElement.addEventListener('playing', ()=>{

                        threadMediaLoadingContainer.style.display = 'none';

                            videoElement.parentNode.querySelectorAll(".thread-media-loading").forEach((threadMediaLoading)=>{

                                videoElement.parentNode.removeChild(threadMediaLoading);

                            });
                        

                    });

                }

                // Create a play button container for the video
                const threadMediaPlayButtonContainer = document.createElement('div');
                threadMediaPlayButtonContainer.setAttribute('class', 'thread-media-loading');
                threadMediaPlayButtonContainer.innerHTML = " <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-play-fill' viewBox='0 0 16 16'><path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/></svg>";

                // Append the loading container to the current media
                media.appendChild(threadMediaPlayButtonContainer);

                // // function to handle "onclick" event of the video
                media.addEventListener('click', ()=>{

                    if ( videoElement.paused )
                    {
                        // videoElement.play();
                        playVideo(videoElement);
                    }

                });

                // Function to handle the "ended" event of the video
                videoElement.addEventListener('ended', ()=>{

                    // Create a loading container with a "Play Again" button
                        const threadMediaLoadingContainer = document.createElement('div');
                                            threadMediaLoadingContainer.setAttribute('class', 'thread-media-loading');
                                            threadMediaLoadingContainer.innerHTML = "<div id='playAgain' class='text-white playAgain'> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z'/></svg>Click Here To Play Again</div>";

                    // Append the loading container to the current media
                        media.appendChild(threadMediaLoadingContainer);

                    // Add an event listener to the "Play Again" button
                        media.querySelector(".playAgain").addEventListener('click', ()=>{

                            // set the time of the current Thread video to the begining
                            videoElement.currentTime = 0;
                            // start playing the current Thread Video
                            playVideo(videoElement);
                            // We delete the PlayAgain div
                            threadMediaLoadingContainer.parentNode.removeChild(threadMediaLoadingContainer);

                            // Call the video-related functions
                            isVideoPlaying();
                            hasVideoLoadedMetadata();
                            isVideoBuffering();

                        });

                });

                // Call the video-related functions
                isVideoPlaying();
                hasVideoLoadedMetadata();
                isVideoBuffering();

                // create the mute button within the current media

                const muteBtn = document.createElement('div');
                            muteBtn.classList.add('mute-btn');
                            muteBtn.innerHTML = "<svg aria-label='Audo is muted.' class='x1lliihq x1n2onr6' color='rgb(255, 255, 255)' fill='rgb(255, 255, 255)' height='12' role='img' viewBox='0 0 48 48' width='12'><title>Audo is muted.</title><path clip-rule='evenodd' d='M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z' fill-rule='evenodd'></path></svg>";
                
                // Append the mute button to the media container
                media.appendChild(muteBtn);

                // Add event listener to the mute button
                muteBtn.addEventListener('click', ()=>{
                    
                    if ( videoElement.muted )
                    {
                        videoElement.muted = false;
                        muteBtn.innerHTML = "<svg aria-label='Audio is playing' class='x1lliihq x1n2onr6' color='rgb(255, 255, 255)' fill='rgb(255, 255, 255)' height='12' role='img' viewBox='0 0 24 24' width='12'><title>Audio is playing</title><path d='M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z'></path></svg>";
                    }
                    else
                    {
                        videoElement.muted = true;
                        muteBtn.innerHTML = "<svg aria-label='Audo is muted.' class='x1lliihq x1n2onr6' color='rgb(255, 255, 255)' fill='rgb(255, 255, 255)' height='12' role='img' viewBox='0 0 48 48' width='12'><title>Audo is muted.</title><path clip-rule='evenodd' d='M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z' fill-rule='evenodd'></path></svg>";
                    }

                });

            } );
            

        }

    } );

    // Checking if a Thread has more than 1 media item 
    if ( allThreadMedias.length >1 )
    {
            // Create the next button to be able to swipe throught the avaialable media items
            const threadMediaNextArrowBtn = document.createElement('div');
                                threadMediaNextArrowBtn.setAttribute('class', 'thread-media-arrow next');
                                threadMediaNextArrowBtn.innerHTML = "<svg aria-label='Right chevron' class='x1lliihq x1n2onr6'  height='16' role='img' viewBox='0 0 24 24' width='16'><title>Right chevron</title><path d='M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z'></path></svg>";

            // Create the previous button to be able to swipe throught the avaialable media items
            const threadMediaPrevArrowBtn = document.createElement('div');
                                threadMediaPrevArrowBtn.setAttribute('class', 'thread-media-arrow prev');
                                threadMediaPrevArrowBtn.innerHTML = "<svg aria-label='Right chevron' class='x1lliihq x1n2onr6'  height='16' role='img' viewBox='0 0 24 24' width='16'><title>Right chevron</title><path d='M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z'></path></svg>";

            // Append the next and previoud button to the Medias Container
            threadMediasParentContainer.appendChild(threadMediaNextArrowBtn);
            threadMediasParentContainer.appendChild(threadMediaPrevArrowBtn);

            // Add event listener on the "Previous Arrow" to go back to a previous media
            threadMediaPrevArrowBtn.addEventListener('click', ()=>{
                slideLeft();
            });

            // Add event listener on the "Next Arrow Button" to go to the next media
            threadMediaNextArrowBtn.addEventListener('click', ()=>{
                slideRight();
            });

    }

    


    // Slide left function
    function slideLeft() {
        threadMediasContainer.scrollBy({
            left: -threadMediasContainer.offsetWidth,
            behavior: "smooth"
        });
    }

    // Slide right function
    function slideRight() {
        threadMediasContainer.scrollBy({
            left: threadMediasContainer.offsetWidth,
            behavior: "smooth"
        });
    }

    // swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    threadMediasContainer.addEventListener('touchstart', handleTouchStart, false);
    threadMediasContainer.addEventListener('touchend', handleTouchEnd, false);

    // Touchstart event handler
    // Touchstart event handler for the medias container to swipe between the Threads medias
    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    // Touchend event handler
    // Touchend event handler for the medias container to swipe between the Threads medias
    function handleTouchEnd(event) {
        touchEndX= event.changedTouches[0].screenX;
        handleSwipeGesture();
    }

    // Handles the swiping of the media items
    function handleSwipeGesture() {
        
        if ( touchStartX - touchEndX > 50 )
        {
            slideRight();
        }
        else if ( touchEndX - touchStartX > 50 )
        {
            slideLeft();
        }

    }

} );


// function to toggle between each Thread options menu
function toggleThreadMenu() 
{

    const threads = document.querySelectorAll('.js-thread');

    threads.forEach( (thread)=>{

        const threadMenuBtn = thread.querySelector('.js-thread-menu-icon');

        if ( threadMenuBtn != null || threadMenuBtn != undefined )
        {

                threadMenuBtn.addEventListener("click", ()=>{


                         const threadMenu = thread.querySelector('.thread-options-menu-container');
                        const threadMenuItems = thread.querySelectorAll('.thread-options-menu-item');

                        

                        if ( threadMenu.classList.toggle('display-block') )
                        {

                            threadMenuItems.forEach( (threadMenuItem)=>{

                                threadMenuItem.addEventListener('click', ()=>{

                                    threadMenu.classList.remove('display-block');

                                });

                            } );

                        }


                });

        }

    } );
    
}

toggleThreadMenu();


function likeAThread() 
{

    // perform AJAX Request and get new number of likes


    // when AJAX is completed
    return true;
    
}

function unlikeAThread() 
{
    // when AJAX is completed
    return true;
}

function likeOrDislikeAThread() 
{

    let threads = document.querySelectorAll('.js-thread');

    threads.forEach( (thread)=>{

        const likeBtn = thread.querySelector('.js-like');
        const numberOfLikesContainer = thread.querySelector('.js-number-of-likes');
        let numberOfLikes = parseInt( numberOfLikesContainer.innerHTML );

        likeBtn.addEventListener('click', ()=>{

            let icon = likeBtn.querySelector('svg');

            if ( !icon.classList.contains('unlike') )
            {
                

                if ( likeAThread() )
                {

                    likeBtn.innerHTML = "<svg aria-label='Unlike' class='x1lliihq x1n2onr6 unlike' color='rgb(255, 48, 64)' fill='rgb(255, 48, 64)' height='24' role='img' viewBox='0 0 48 48' width='24'><title>Unlike</title><path d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path></svg>";
                    numberOfLikes += 1;
                    numberOfLikesContainer.innerHTML = numberOfLikes;

                }
                
            }
            else
            {
                
                
                if ( unlikeAThread() )
                {

                    likeBtn.innerHTML = "<svg aria-label='Like' class='x1lliihq x1n2onr6'  height='24' role='img' viewBox='0 0 24 24' width='24'><title>Like</title><path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path></svg>";
                    numberOfLikes -= 1;
                    numberOfLikesContainer.innerHTML = numberOfLikes;

                }

            }

        });

    } );
    
}

likeOrDislikeAThread();

// likeAThread();

function addVerifiedIconsToUsernames() 
{

    document.querySelectorAll('.js-verified').forEach( (username)=>{

        username.innerHTML = username.innerHTML + "<svg aria-label='Verified' class='x1lliihq x1n2onr6 verified' color='rgb(0, 149, 246)' fill='rgb(0, 149, 246)' height='12' role='img' viewBox='0 0 40 40' width='12'><title>Verified</title><path d='M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z' fill-rule='evenodd'></path></svg>";

    } );
    
}

addVerifiedIconsToUsernames();

