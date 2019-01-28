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
    outputTextBox.value = output;
    clearInputs();
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

showExampleButton.addEventListener("click", function() {
    const div = document.getElementById("example");
    if (currentFormat == null) {
        alert("Choose a reference type to view examples.");
    }
    else if (div.getAttribute("style") == "display: none;") {
        // Div is hidden
        showElements(["example"]);
    } else {
        // Div is visible
        hideElements(["example"]);
    }
});

formatSelect.addEventListener("change", function() {
    let choice = formatSelect[formatSelect.selectedIndex].value;
    const exampleTitle = document.getElementById("referenceExampleTitle");
    const exampleText = document.getElementById("referenceExampleText");

    if (currentFormat === null) {
        // No format selected
        currentFormat = choice;
        showElements(formats[currentFormat].inputs);
        // Update example text & title
        exampleTitle.innerHTML = (formats[currentFormat].name + " (Example)");
        exampleText.innerHTML = (formats[currentFormat].example);
    } else if (currentFormat !== choice) {
        // Format has been changed
        hideElements(formats[currentFormat].inputs);
        currentFormat = choice;
        showElements(formats[currentFormat].inputs);
        // Update example text & title
        exampleTitle.innerHTML = (formats[currentFormat].name + " (Example)");
        exampleText.innerHTML = (formats[currentFormat].example);
    }

    showElements(["cardTwo", "output"]); // Show any elements hidden by default
    
    // Scroll the page to fit form on screen
    let target = document.getElementById('cardTwo');
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});