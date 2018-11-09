"use strict"

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
};