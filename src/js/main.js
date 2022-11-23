const listItems = document.querySelectorAll('.js-li');              // Select all elements with the js-nav-button class

for (const listItem of listItems) {                                 // Loop over the selected elements - item in array of buttons - automatically selects 'children' from 'parent'
    const navButton = listItem.firstElementChild;                   // Makes variable navButton = the first elementchild of listItem within listItems
    const navButtonHasPopup = hasPopup(navButton);                  // Save variable as navButtonHasPopup if hasPopup 

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
        if (currentFocussedElement.closest('.js-submenu') === null) {
            setAriaExpandedFalse(navButton);
            removeActiveClass(listItem);
        }
    });

}

// function open submenu with space, enter or arrow
document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowDown') {
        const currentFocussedElement = document.activeElement;                      // Het element waar we nu op focussen.
        if (hasPopup(currentFocussedElement) === true) {                            // Heeft dat element een aria-haspopup attribuut? Zo ja, dan is het een van onze buttons.
            const listItem = currentFocussedElement.parentElement;
            if (isOpen(currentFocussedElement) === true) {                          // Staat de aria-expanded attribute nu op "true"? Oftewel is hij open?
                currentFocussedElement.setAttribute('aria-expanded', 'false');      // Zet de aria-expanded attribute nu op false
                removeActiveClass(listItem);
            } else {
                currentFocussedElement.setAttribute('aria-expanded', 'true');       // anders zet aria-expanded attribute op true
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

// function doSomethingLater(callback) {
//     setTimeout(callback, 2000);
// }

// doSomethingLater(function() {
//   console.log('hello');
// });
