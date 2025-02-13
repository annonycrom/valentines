let heartsAreHearts = true; // Flag to track if the hearts are love or sad emojis
let isYesClicked = false; // Flag to check if "Yes" has been clicked
let existingGifs = []; // Array to track positions of existing GIFs

function addHappyGif() {
    if (!isYesClicked) return; // Only add GIFs after "Yes" is clicked

    const gifContainer = document.querySelector(".gif-container");

    // Array of happy GIF URLs (Replace with actual GIF links)
    const happyGifUrls = [
        "image7.gif",
        "image8.gif",
        "image9.gif",
        "image10.gif",
    ];

    // Create an img element for each happy GIF
    happyGifUrls.forEach(randomGif => {
        let gif = document.createElement("img");
        gif.src = randomGif;
        gif.classList.add("happy-gif");
        gif.style.display = "block"; 
        gif.style.position = "absolute"; // Allow random positioning
        gif.style.maxWidth = "150px";
        gif.style.borderRadius = "10px";  
        gif.style.zIndex = "1000";
        gif.style.pointerEvents = "none";

        // Randomize position within viewport (avoiding overlap with other GIFs and video)
        let videoArea = document.querySelector('.video-container');
        let videoRect = videoArea ? videoArea.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };

        let maxX = window.innerWidth - 180; // Prevent overflow
        let maxY = window.innerHeight - 180;

        // Ensure the new GIF doesn't overlap any existing GIF or the video container
        let x, y;
        let isOverlapping;
        do {
            x = Math.random() * maxX;
            y = Math.random() * maxY;

            // Check overlap with video container
            isOverlapping = (x > videoRect.left && x < videoRect.left + videoRect.width &&
                            y > videoRect.top && y < videoRect.top + videoRect.height);

            // Check overlap with existing GIFs
            existingGifs.forEach(existingGif => {
                let existingRect = existingGif.getBoundingClientRect();
                if (x < existingRect.left + existingRect.width && x + 150 > existingRect.left &&
                    y < existingRect.top + existingRect.height && y + 150 > existingRect.top) {
                    isOverlapping = true; // If any overlap, break the loop
                }
            });

        } while (isOverlapping);

        // Set position
        gif.style.left = x + "px";
        gif.style.top = y + "px";

        document.body.appendChild(gif); // Add to body so it appears anywhere

        // Track the position of the new GIF
        existingGifs.push(gif);

        // Remove GIF after 5 seconds
        setTimeout(() => {
            gif.remove();
            existingGifs = existingGifs.filter(existingGif => existingGif !== gif); // Remove from the tracking array
        }, 5000);
    });
}

function startExperience() {
    document.querySelector('.welcome').classList.add('hidden');
    let letters = document.querySelector('.letters');
    letters.classList.remove('hidden');
    
    let messages = document.querySelectorAll('.letter');
    messages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.opacity = "1";
            msg.style.transform = "translateY(0)";
        }, index * 2000);
    });

    generateHearts();
}

function showVideo() {
    document.querySelector('.letters').classList.add('hidden');
    document.querySelector('.video-container').classList.remove('hidden');
}

function generateHearts() {
    setInterval(() => {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartsAreHearts ? getRandomLoveEmoji() : getRandomSadEmoji(); // Toggle emojis
        
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "120px"; // Start from above the roses
        heart.style.animationDuration = (3 + Math.random() * 2) + "s";
        
        document.querySelector('.hearts-container').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 500);
}

// Returns a random love emoji
function getRandomLoveEmoji() {
    const loveEmojis = ["❤️", "😍", "💘", "💖", "💝", "😘", "💌", "🥰", "💕", "💞"];
    return loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
}

// Returns a random sad emoji
function getRandomSadEmoji() {
    const sadEmojis = ["😢", "😭", "😔", "😞", "😓", "😿", "☹️", "🥺", "😩"];
    return sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
}

// Moves the "No" button randomly and adds GIFs
function moveNoButton() {
    let button = document.getElementById("noButton");
    let maxX = window.innerWidth - button.clientWidth - 50;
    let maxY = window.innerHeight - button.clientHeight - 50;
    
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    button.style.position = "absolute"; 
    button.style.left = x + "px";
    button.style.top = y + "px";
    
    // Change "No" button emoji randomly
    let emojis = ["😜", "😂", "😆", "🤪", "😝", "🤣", "🙃"];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    button.innerHTML = `No ${randomEmoji}`;

    // Add a playful GIF
    addGif();
}

// Function to add a GIF when "No" is clicked
function addGif() {
    // Remove all GIFs instantly if "Yes" was clicked
    if (isYesClicked) {
        const gifs = document.querySelectorAll(".funny-gif");
        gifs.forEach(gif => gif.remove()); // Remove all GIFs
        return;
    }

    const gifContainer = document.querySelector(".gif-container");

    // Array of funny/sad GIF URLs (Replace with actual GIF links)
    const gifUrls = [
        "image1.gif",
        "image2.gif",
        "image3.gif",
        "image4.gif",
        "image5.gif",
        "image6.gif",
    ];

    let randomGif = gifUrls[Math.floor(Math.random() * gifUrls.length)];

    // Create an img element
    let gif = document.createElement("img");
    gif.src = randomGif;
    gif.classList.add("funny-gif");
    gif.style.display = "block"; 
    gif.style.position = "absolute"; // Allow random positioning
    gif.style.maxWidth = "150px";
    gif.style.borderRadius = "10px";  
    gif.style.zIndex = "1000";
    gif.style.pointerEvents = "none";

    // Randomize position within viewport (avoiding overlap with existing GIFs and video container)
    let videoArea = document.querySelector('.video-container');
    let videoRect = videoArea ? videoArea.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };

    let maxX = window.innerWidth - 180; // Prevent overflow
    let maxY = window.innerHeight - 180;

    // Ensure the new GIF doesn't overlap any existing GIF or the video container
    let x, y;
    let isOverlapping;
    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;

        // Check overlap with video container
        isOverlapping = (x > videoRect.left && x < videoRect.left + videoRect.width &&
                        y > videoRect.top && y < videoRect.top + videoRect.height);

        // Check overlap with existing GIFs
        existingGifs.forEach(existingGif => {
            let existingRect = existingGif.getBoundingClientRect();
            if (x < existingRect.left + existingRect.width && x + 150 > existingRect.left &&
                y < existingRect.top + existingRect.height && y + 150 > existingRect.top) {
                isOverlapping = true; // If any overlap, break the loop
            }
        });

    } while (isOverlapping);

    // Set position
    gif.style.left = x + "px";
    gif.style.top = y + "px";

    document.body.appendChild(gif); // Add to body so it appears anywhere

    // Track the position of the new GIF
    existingGifs.push(gif);

    // Remove GIF after 5 seconds
    setTimeout(() => {
        gif.remove();
        existingGifs = existingGifs.filter(existingGif => existingGif !== gif); // Remove from the tracking array
    }, 5000);
}

// Play video on button click
const video = document.getElementById("video1");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", function() {
    video.play();
    playButton.style.display = "none"; // Hide button after play
    isYesClicked = true; // Set the flag to true when "Yes" is clicked

    // Remove all GIFs instantly when "Yes" is clicked
    const gifs = document.querySelectorAll(".happy-gif, .funny-gif");
    gifs.forEach(gif => gif.remove()); // Remove all GIFs

    // Call addHappyGif to add all happy GIFs instantly
    addHappyGif();

    // Reset the hearts to love emojis when "Yes" is clicked
    heartsAreHearts = true;

    // Call generateHearts to reflect the update in emoji
    generateHearts();
});

// Event listeners for buttons
document.getElementById("noButton").addEventListener("click", function() {
    heartsAreHearts = false; // Change hearts to sad emojis
    addGif(); // Add GIF after "No" button click
});

const yesButton = document.getElementById("playButton");

yesButton.addEventListener("click", function() {
    // Play the video when "Yes" is clicked
    video.play();
    yesButton.style.display = "none"; // Hide the Yes button after it's clicked

    // Add all the happy GIFs instantly
    addHappyGif();
    generateHearts(); // Function for generating hearts if needed
});
