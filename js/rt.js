var authorOrg, yearCreated, dateAccessed, titleOfSite, titleOfDoc, referenceURL, finalRefPlain, finalRefMarkdown, selectedRefType, selectedRefFormat;

var sep = ". ";

function formChanged() {
	collectDetails(); // Collect the users entry
	selectReferenceType(); // Find out and store what reference type the user has selected
	selectReferenceFormat(); // Find out and store what reference format the user has selected
	adjustElements(); //  Adjust the elements to only show what is needed
	pickDateAccessedToday(); // Pick the current date automatically
	doReferencing(); // Create the reference and store it in a variable ready for display
	displayReference(); // Display the reference in a textarea
	clipboardBtnInit(); // Get the copy to clipboard button ready for the user to click it
}

function collectDetails() {
	authorOrg = document.getElementById("authorOrg").value;
	yearCreated = document.getElementById("yearCreated").value;
	dateAccessed = document.getElementById("dateAccessed").value;
	titleOfSite = document.getElementById("titleOfSite").value;
	titleOfDoc = document.getElementById("titleOfDoc").value;
	referenceURL = document.getElementById("referenceURL").value;
}

function selectReferenceType() {
	var selector = document.getElementById("referenceType");
	selectedRefType = selector[selector.selectedIndex].value;
}

function selectReferenceFormat() {
	var selector = document.getElementById("referenceFormat");
	selectedRefFormat = selector[selector.selectedIndex].value;
}

function doReferencing() {
	if (selectedRefType == "bhA") {
		frBangorHarvardA();
	} 
	if (selectedRefType == "bhB") {
		frBangorHarvardB();
	}
	if (selectedRefType == "bhC") {
		frBangorHarvardC();
	}
}

function displayReference() {
	if (selectedRefFormat == "plain") {
		document.getElementById('formattedReference').innerHTML = finalRefPlain;
	} else if (selectedRefFormat == "md") {
		document.getElementById('formattedReference').innerHTML = finalRefMarkdown;
	} else {
		console.log("Issue with displayReference function");
	}
}

function clipboardBtnInit() {
	if (selectedRefFormat == "plain") {
		document.getElementById('formattedReference').value = finalRefPlain;
		var clip = new Clipboard('.copyBtn');
		
		clip.on('success', function(e) {
			$('.copied').show();
				$('.copied').fadeOut(1000);
		});
	} else if (selectedRefFormat == "md") {
		document.getElementById('formattedReference').value = finalRefMarkdown;
		var clip = new Clipboard('.copyBtn');
		
		clip.on('success', function(e) {
			$('.copied').show();
				$('.copied').fadeOut(1000);
		});
	}
}

function formClear() {
	if (confirm("Are you sure?") == true) {
		document.getElementById("refForm").reset();
		document.getElementById("formattedReference").value = "";
	} else {
		// Do nothing
		console.log("Chose not to clear the form");
	} 
}

// Referencing formats

function frBangorHarvardA() {
	finalRefPlain = titleOfSite + sep + yearCreated + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
	finalRefMarkdown = titleOfSite + sep + yearCreated + ". [Online]. " + "Available at: " + "[" + referenceURL + "]" + "(" + referenceURL + ")" + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardB() {
	finalRefPlain = authorOrg + sep + yearCreated + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
	finalRefMarkdown = authorOrg + sep + yearCreated + sep + titleOfSite + ". [Online]. " + "Available at: " + "[" + referenceURL + "]" + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardC() {
	finalRefPlain = authorOrg + sep + yearCreated + sep + titleOfDoc + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
	finalRefMarkdown = authorOrg + sep + yearCreated + sep + titleOfDoc + sep + titleOfSite + ". [Online]. " + "Available at: " + "[" + referenceURL + "]" + ". Accessed " + dateAccessed + ".";
}

// Element showing and hiding

function adjustElements() {
	if (selectedRefType == "bhA") {
		hideNonCommonElements();

		commonElementsShow();
	} 
	if (selectedRefType == "bhB") {
		hideNonCommonElements();

		commonElementsShow();
		bhbElementsShow();
	} 
	if (selectedRefType == "bhC") {
		hideNonCommonElements();

		commonElementsShow();
		bhbElementsShow();
		bhcElementsShow();
	} 
}

function commonElementsShow() {
	showContent("yearCreated", "referenceURL", "dateAccessed", "titleOfSite");
}

function bhbElementsShow() {
	showContent("authorOrg", "titleOfSite");
}

function bhcElementsShow() { // Show any elements needed for reference type B
	showContent("authorOrg", "titleOfSite", "titleOfDoc");
}

function hideNonCommonElements() { // Hide any elements that are not needed by all reference types
	hideContent("authorOrg", "titleOfSite", "titleOfDoc");
}

function hideContent() { // Function for hiding elements by ID such as "hideContent("authorOrg", "titleOfSite");"
	if (arguments.length > 0) {
    	for (var i=0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).style.display = "none";
		}
	} 
}

function showContent() { // Function for showing elements by ID such as "showContent("authorOrg", "titleOfSite");"
	if (arguments.length > 0) {
		for (var i=0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).style.display = "block";
		}
	}
}

// Date Picker

function pickDateAccessedToday() {
	var date = new Date();
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	var theDay = date.getDate();
	var theMonth = months[date.getMonth()];
	var theYear = date.getFullYear();

	function nth(d) {
		if(d>3 && d<21) return 'th';
		switch (d % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
	}	
	
	document.getElementById("dateAccessed").value = theDay + nth(theDay) + " " + theMonth + " " + theYear;
}