const listItems = document.querySelectorAll('.js-li');    
const subCloseButton = document.querySelectorAll('.js-close-sub');          // Select all elements with the js-nav-button class
const mobileScreen = matchMedia('(max-width: 767px)');

for (const listItem of listItems) {                                 // Loop over the selected elements - item in array of buttons - automatically selects 'children' from 'parent'
    const navButton = listItem.firstElementChild;                   // Makes variable navButton = the first elementchild of listItem within listItems
    const navButtonHasPopup = hasPopup(navButton);                  // Save variable as navButtonHasPopup if hasPopup 

    if (mobileScreen.matches === true) {
        navButton.addEventListener('click', (event) => {
            if (navButtonHasPopup) {
                setAriaExpandedTrue(navButton);
            }
        });
            
            
    } else {
        listItem.addEventListener('mouseenter', (event) => {           // Listen for mouseenter event on each button (hover)
            if (navButtonHasPopup) {
                setAriaExpandedTrue(navButton);                         // first variable: what has to change? second variable: change to what? 
                addActiveClass(listItem);
            }
        });
    
        listItem.addEventListener('mouseleave', (event) => {           // Listen for mouseleave event on each button (no hover)
            if (navButtonHasPopup) {
                setAriaExpandedFalse(navButton);
                removeActiveClass(listItem);
            }
        });
        
        listItem.addEventListener('focusout', (event) => {                  // closes submenu if not focussed anymore
            const currentFocussedElement = event.relatedTarget;
            if (currentFocussedElement !== null && currentFocussedElement.closest('.js-submenu') === null) {
                setAriaExpandedFalse(navButton);
                removeActiveClass(listItem);
            }
        });
    }

    
    
}

// function open submenu with space, enter or arrow
document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowDown') {
        const currentFocussedElement = document.activeElement;                                  // Het element waar we nu op focussen.
        if (hasPopup(currentFocussedElement) === true) {                                        // Heeft dat element een aria-haspopup attribuut? Zo ja, dan is het een van onze buttons.
            const listItem = currentFocussedElement.parentElement;
            if (isOpen(currentFocussedElement) === true) {                                      // Staat de aria-expanded attribute nu op "true"? Oftewel is hij open?
                currentFocussedElement.setAttribute('aria-expanded', 'false');                  // Zet de aria-expanded attribute nu op false
                removeActiveClass(listItem);
            } else {
                currentFocussedElement.setAttribute('aria-expanded', 'true');                   // Anders zet aria-expanded attribute op true
                addActiveClass(listItem);
            }
        }
    }
}) 

function hasPopup(navButton) {
    return navButton.getAttribute('aria-haspopup') === 'true'; 
}

function isOpen(navButton) {
    return navButton.getAttribute('aria-expanded') === 'true';
}

function setAriaExpandedTrue(navButton) {
    navButton.setAttribute('aria-expanded', 'true');
}

function setAriaExpandedFalse(navButton) {
    navButton.setAttribute('aria-expanded', 'false');
}

function addActiveClass(listItem) {
    listItem.classList.add('active-nav');
}

function removeActiveClass(listItem) {
    listItem.classList.remove('active-nav');
}


// Mobile menu 

const menuButton = document.querySelector('.mobile-button');

menuButton.addEventListener('click', (event) => {
    const selectHTML = document.querySelector('html');
    const openMenu = selectHTML.classList.toggle('menu-is-open')

    if (openMenu === true) {
        setAriaExpandedTrue(menuButton);
    } else {
        setAriaExpandedFalse(menuButton)
    }
});

const subButtons = document.querySelectorAll('.js-close-sub');

for (const subButton of subButtons) {
    subButton.addEventListener('click', (event) => {            
        const selectClosestListItem = subButton.closest('.js-li');
        const selectChildButton = selectClosestListItem.querySelector('.js-nav-button');
        
        setAriaExpandedFalse(selectChildButton);
        console.log(selectChildButton);
    })
};



