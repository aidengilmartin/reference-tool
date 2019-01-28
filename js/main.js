"use strict"

let currentFormat = null;
let history = [];

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
                tr.className += " " + 'animated fadeIn';
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
            if (history.length === 5) { // If there are 5 history entries
                history.push(entry); // Insert the string into the array
                history.splice(0, 1); // Delete the first item in the array (the oldest)
                localStorage.setItem('history', JSON.stringify(history)); // Update localStorage
            } else {
                history.push(entry);  // Push entry to history
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