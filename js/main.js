/* TODO */
/*

    - Switch from for to forEach where applicable. https://thejsguy.com/2016/07/30/javascript-for-loop-vs-array-foreach.html
    - Look at using arrow functions where applicable.

*/

"use strict"

/* UI Controls */
const formatSelect = document.getElementById("referenceFormat");
const createButton = document.getElementById("create");
const outputTextBox = document.getElementById("outputText");
const historyClearButton = document.getElementById("historyClear");
const clipboardButton = document.getElementById('clipboard');
const clearAllButton = document.getElementById('clearAll');
/* HTML Elements */
const historyTable = document.getElementById('historyTable');
/* Other */
let currentFormat = null;
let history = [];

const formats = {
    webA: {
        name:"Website without author",
        elements:["stepTwo", "titleOfWebsite", "year", "accessed", "url"],
        creation: function() {
            let output = (titleOfWebsite.value + ". " + year.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webB: {
        name:"Website with author or organisation",
        elements:["stepTwo", "titleOfWebsite", "author", "year", "accessed", "url"],
        creation: function() {
            let output = (author.value + ". " + year.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webC: {
        name:"Document on website",
        elements:["stepTwo", "titleOfWebsite", "titleOfDocument", "author", "year", "accessed", "url"],
        creation: function() {
            let output = (author.value + ". " + year.value + ". " + titleOfDocument.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
}

const historyfun = {
    display: {
        clear: function() {
            while (historyTable.firstChild) {
                historyTable.firstChild.remove();
            }
        },
        fill: function() {
            // let reverse = history.reverse(); // Causes issues with the table not populating in order
            history.forEach(function(entry) {
                let tbody = document.getElementById('historyTable');
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                tbody.appendChild(tr);
                td.textContent = entry;
                tr.appendChild(td);
            })
        }
    },
    data: {
        clear: function() {
            history = [];
            localStorage.setItem('history', JSON.stringify(history));
        },
        add: function(entry) {
            if (entry == undefined) {
                // Do nothing. The history just needs to be displayed ********** LOOK AT THIS MAY NOT BE NEEDED
            } else if (history.length === 5) { // If the array is 5 entries long
                history.push(entry); // Insert the string into the array
                history.splice(0, 1); // Delete the first item in the array (the oldest)
                localStorage.setItem('history', JSON.stringify(history)); // Update localStorage
            } else {
                history.push(entry); 
                localStorage.setItem('history', JSON.stringify(history)); // Update localStorage
            };
        }
    },
    update: function(entry) {
        historyfun.data.add(entry); // Add the entry to the history
        historyfun.display.clear(); // Clear the history display (for a data refresh);
        historyfun.display.fill(); // Fill the history display with the latest data
    },
    reset: function() {
        historyfun.display.clear();
        historyfun.data.clear();
    }
}

window.onload = function() {
    // Get history from localStorage (if exists)
    if (localStorage.getItem('history') === null) {
        // Key doesn't exist. Create an empty array, make it a JSON string, and add that to localStorage.
        localStorage.setItem('history', JSON.stringify([]));
    } else {
        // Key does exist. Retrieve the contents from localStorage and add the contents to the array.
        history = JSON.parse(localStorage.getItem('history'));
    }
    // Populate the history
    historyfun.display.fill();
};

historyClearButton.addEventListener("click", historyfun.reset);

formatSelect.addEventListener("change", function() {
    let choice = formatSelect[formatSelect.selectedIndex].value;
    
    if (currentFormat === null) {
        // No format selected
        currentFormat = choice;
        showElements(formats[currentFormat].elements);
    } else if (currentFormat !== choice) {
        // Format has been changed
        hideElements(formats[currentFormat].elements);
        currentFormat = choice;
        showElements(formats[currentFormat].elements);
    }

    showElements(["stepTwoContainer", "output"]); // Show any currently hidden elements
    
    // scrollElement('stepTwoContainer'); // Scroll to the input area
    let target = document.getElementById('stepTwoContainer');
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    // let firstInput = document.getElementById('inputForm').firstElementChild; ************** THIS INTERFERERS WITH THE SCROLL TO ELEMENT
    // firstInput.focus();
});

createButton.addEventListener("click", function() {
    let output = formats[currentFormat].creation();

    // Set output text and clear inputs
    outputTextBox.value = output;
    clearInputs();

    // Add output to history
    historyfun.update(output);
});

clipboardButton.addEventListener("click", function() {
    let text = outputTextBox.value;
    try {
        navigator.clipboard.writeText(text).then;
        alert("Output is now in clipboard ready to paste.");
    } catch {
        alert("RT can't access your clipboard.\nCopy the output manually.");
    }
    
});

clearAllButton.addEventListener("click", function() {
    clearInputs();
    outputTextBox.value = "";
});

const clearInputs = () => {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
};

function showElements(ids) {
    for (let i = 0; i < ids.length; i++) {
        let element = document.getElementById(ids[i]);
        element.style = ""; // Clear the style in HTML (only used for hiding)
        element.className += " " + 'animated fadeIn'; // Add an animation
    };
};

function hideElements(ids) {
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style = "display: none;";
    };
}

// function scrollElement(target) { ************* DEFUNCT
//     // Call function with a target element ID (string) and the page will be scrolled to that element
//     target = document.getElementById(target);
//     let distanceFromTop = target.getBoundingClientRect().top;
//     window.scrollBy(0, distanceFromTop);
// }