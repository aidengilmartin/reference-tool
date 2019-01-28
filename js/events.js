"use strict"

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

    // Populate format dropdown
    Object.keys(formats).forEach(key => {
        let option = document.createElement('option');
        option.setAttribute("value", key);
        option.text = formats[key].name;
        formatSelect.appendChild(option);
    });

    // Create all input elements ready for showing and hiding
    const form = document.getElementById('inputForm');
    for (let i = 0; i < allElements.length; i++) {
        form.appendChild(allElements[i]);
    }
};

historyClearButton.addEventListener("click", historyfun.reset);

clearAllButton.addEventListener("click", function() {
    clearInputs();
    outputTextBox.value = "";
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

createButton.addEventListener("click", function() {
    let output = formats[currentFormat].create();

    // Set output text and clear inputs
    outputTextBox.value = output;
    clearInputs();

    // Add output to history
    historyfun.update(output);
});

dateTodayButton.addEventListener("click", function() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date();
    let day = date.getDate();
	let month = months[date.getMonth()];
    let year = date.getFullYear();
    
	function nth(d) {
		if(d>3 && d<21) return 'th';
		switch (d % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
    };
    
    let output = (day + nth(day) + " " + month + " " + year);
    dateInput.value = output;
});

formatSelect.addEventListener("change", function() {
    let choice = formatSelect[formatSelect.selectedIndex].value;
    
    if (currentFormat === null) {
        // No format selected
        currentFormat = choice;
        showElements(formats[currentFormat].inputs);
    } else if (currentFormat !== choice) {
        // Format has been changed
        hideElements(formats[currentFormat].inputs);
        currentFormat = choice;
        showElements(formats[currentFormat].inputs);
    }

    showElements(["stepTwoContainer", "output"]); // Show any currently hidden elements
    
    let target = document.getElementById('stepTwoContainer');
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    // let firstInput = document.getElementById('inputForm').firstElementChild; ************** THIS INTERFERERS WITH THE SCROLL TO ELEMENT
    // firstInput.focus();
});