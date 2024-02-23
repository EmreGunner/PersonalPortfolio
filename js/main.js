//====== Global Vars
    let Lg_navbar      = document.querySelector("nav");
    let top_bar_navbar = document.querySelector(".scrolling-navbar");
    let side_nav       = document.querySelector(".offcanvas");
//===== All Panels Buttons In Website For Using In Shuffle
    // Resume Section Panel Buttons
    let resume_tabs = document.querySelectorAll(".resume .panel-dad ul li a");
    let resume_cont = document.querySelectorAll(".resume .content");
    // Clients Section Panel Buttons
    let clients_tabs = document.querySelectorAll( ".clients .left-side-buttons ul li a");
    let clients_cont = document.querySelectorAll(".clients .content");
    // Pricing  Section Panel Buttons
    let pricing_tabs = document.querySelectorAll(".pricing-panel ul li a");
    let pricing_cont = document.querySelectorAll(".pricing .content");
    
//========= Hide Body Overflow .
if (document.body) {
    document.body.style.overflow = 'hidden';
}
//===== All Effects On Scroll Window Function .
    function scrolling_site() {
        window.onscroll = () => {
            // Set Navbar Background Effect On Scroll
            if (window.scrollY > 200) {
                document.querySelector(".scrolling-navbar").classList.add("scrolling-nav");
            } else {
                document
                .querySelector(".scrolling-navbar")
                .classList.remove("scrolling-nav");
            }
        
            // Show Button Go Top On Scroll
            if (window.scrollY > 800) {
                document.querySelector(".to-top-btn").style.opacity = 1;
            } else {
                document.querySelector(".to-top-btn").style.opacity = 0;
            }
        };  
    };

//===== Go To Top On Click Button .
function to_top() {
    let to_top = document.querySelector(".to-top-btn");
    if (to_top) {
        to_top.addEventListener('click', function(event) {
            console.log(".to-top-btn clicked");
            event.stopPropagation();
            window.scrollTo(0, 0);
        });
    }
}

//=========== Side Navbar Custmiztion .
function customization_menu() {
    document.body.addEventListener('click', (event) => {
          // Check if the click is on a project box or inside a project box
        if (event.target.closest('.box')) {
            // Click is inside a project box, do nothing
            console.log("Box Clicked -Customization Menu")
            return;
        }
        // Check if the click event is inside 'side_nav' or is 'side_nav' itself
        if (side_nav.contains(event.target) || event.target === side_nav) {
            // The click is inside 'side_nav', do nothing
        } else {
            // The click is outside 'side_nav'
            if (side_nav.style.visibility == "visible") {
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = 0;
                top_bar_navbar.style.paddingRight = 0;
                side_nav.style.maxWidth = `${90}%`;
            }
        }
    });
}


//========== Shuffle Content .
    function shuffling() {
        //===== Function Active Button On Clicked
            function shuffle(tabs, content) {
                let theTabs = Array.from(tabs);
                let theContent = Array.from(content);
        
                //===== Active Button On Clicked
                theTabs.forEach((tab) => {
                    tab.addEventListener("click", (el) => {
                    // Prevent Button Default Job
                    el.preventDefault();
        
                    // Remove Active Class
                    theTabs.forEach((btn) => {
                        btn.classList.remove("active");
                    });
        
                    // Add Class Active
                    el.currentTarget.classList.add("active");
        
                    // Hide Div Contnet
                    theContent.forEach((cont) => {
                        cont.style.display = "none";
                    });
        
                    // Show Target Div
                    document.querySelector(el.currentTarget.dataset.content).style.display =
                        "block";
                    });
                });
            }
        
        //========== Run Function Active Tabs & Target Content
            shuffle(resume_tabs, resume_cont);
            shuffle(clients_tabs, clients_cont);
            shuffle(pricing_tabs, pricing_cont);
    }; 
    
//============ Body Custmization .
    function customization_body() {
        // Check Upper Navbar Inner Height
        if (Lg_navbar && Lg_navbar.clientHeight > 10) {
            document.body.style.paddingTop = `${Lg_navbar.clientHeight}px`;
        } else if (top_bar_navbar && top_bar_navbar.clientHeight > 10) {
            document.body.style.paddingTop = `${top_bar_navbar.clientHeight}px`;
        } else {
            document.body.style.paddingTop = 0;
        }
    };

//======== Make Type Write Effect .
function writeEffectApp() {
    const baseText = `i'm Emre Guner `;
    const phrases = ["a developer", "an entrepreneur", "an AI Implementer"];
    let catchs = document.querySelector('.header-content .content-info h1 .catchs');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Time in ms for adding a character
    const deletingSpeed = 50; // Time in ms for deleting a character
    const endOfPhrasePause = 1500; // Pause time at the end of a phrase before deleting

    function typeWriter() {
        if (isDeleting) {
            if (charIndex > 0) {
                charIndex--;
                updateText();
                setTimeout(typeWriter, deletingSpeed);
            } else {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeWriter, endOfPhrasePause); // Wait before start typing next phrase
            }
        } else {
            if (charIndex < phrases[phraseIndex].length) {
                charIndex++;
                updateText();
                setTimeout(typeWriter, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(typeWriter, endOfPhrasePause); // Wait a bit longer at end of phrase before deleting
            }
        }
    }

    function updateText() {
        catchs.textContent = baseText + phrases[phraseIndex].substring(0, charIndex);
    }

    typeWriter();
};


// Function to add click event listeners to project boxes
function attachClickEventsToProjectBoxes() {
    
    const projectBoxes = document.querySelectorAll('.projects-boxes .box');
    projectBoxes.forEach(box => {
        box.addEventListener('click', function(event) {
            event.stopPropagation(); // Stop event from bubbling up to the body
            // Handle the click event on the project box
            // For example, open a modal or perform another action
            console.log('Project box clicked:', this);
            // Extracting information from the clicked box
            const imageUrl = box.querySelector('.image img').src;
            const projectTitle = box.querySelector('.box-head span').textContent;
            const projectType = box.querySelector('.project-type span:first-child').textContent;
            // Get project URL from the data attribute            
            const projectUrl = this.getAttribute('data-project-url');
            console.log("Project URL")
            console.log(projectUrl)
            // Selecting the modal elements to update
            const modalImage = document.querySelector('#portfolio-pop .portfolio-popup-thumbnail .image img');
            const modalTitle = document.querySelector('#portfolio-pop .text-info h3');
            const modalViewProjectButton = document.querySelector('#portfolio-pop .button-group a:nth-child(2)'); // Select the "View Project" button
            
            // Updating the modal content
            modalImage.src = imageUrl;
            modalImage.alt = projectTitle;
            modalTitle.innerHTML = `<span>Featured - ${projectType}</span> ${projectTitle}`;
            modalViewProjectButton.href = projectUrl; // Update the "View Project" button link
            
            // Assuming you're using Bootstrap's modal component
            // If not, you'll need to adjust how you show the modal
            const portfolioModal = new bootstrap.Modal(document.getElementById('portfolio-pop'));
            portfolioModal.show();
        });
    });
}
//======== Run All Function When Site Is Loading .
    window.onload = ()=> {
        // Top Navbar Padding Setting
        if (top_bar_navbar) {
            top_bar_navbar.style.paddingRight = 0;
        }
        setTimeout(()=>{
            //========= Hide Loading Page
            document.querySelector('.loading-page').style.display = 'none';

            // Run Custimazition Body Function
            customization_body();

            // Run Scrolling Function
            scrolling_site();

            // Run Go To Top Function
            to_top();

            // Run Custimazition Side Menu Function
            customization_menu();
            // Call the function to attach events to project boxes
            attachClickEventsToProjectBoxes();
            // Run Shuffle Content
            shuffling();
                    
            // Run Write Effect Function
            writeEffectApp();

            // Display Body ScrollBar
            document.body.style.overflow = 'auto';
                // Handle modal close functionality
            handleModalClose();

        }, 2000);
    };

// Function to properly handle closing the modal
function handleModalClose() {
    const closeButton = document.querySelector('#portfolio-pop .btn-close');
    const modalElement = document.getElementById('portfolio-pop');
    const portfolioModal = bootstrap.Modal.getInstance(modalElement);

    closeButton.addEventListener('click', () => {
        portfolioModal.hide();
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
        // Remove modal backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());

        // Reset body overflow
        document.body.style.overflow = '';
    });
}


        



