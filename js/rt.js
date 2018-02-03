var authorOrg, yearCreated, dateAccessed, titleOfSite, titleOfDoc, referenceURL, finalReference;

var sep = ". ";

var selectedRefType = "bhA";

function formChanged() {
	collectDetails(); // Collect the users entry
	selectReferenceType(); // Find out and store what reference type the user has selected
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
	document.getElementById('formattedReference').innerHTML = finalReference;
}

function clipboardBtnInit() {
	document.getElementById('formattedReference').value = finalReference;
	var clip = new Clipboard('.copyBtn');
	
	clip.on('success', function(e) {
		$('.copied').show();
			$('.copied').fadeOut(1000);
	});
}

function refTypeChanged() { // When the type of reference has been changed
	formChanged(); // Format the reference again and display it
	adjustElements(); // Hide of display any elements as needed
}

function formClear() {
	if (confirm("Are you sure?") == true) {
		document.getElementById("refForm").reset();
		document.getElementById("formattedReference").value = "";
		formLoad();
	} else {
		// Do nothing
	} 
}

function formLoad() {
	selectReferenceType();
	pickDateAccessedToday();
	adjustElements();
}

// Referencing formats

function frBangorHarvardA() {
	finalReference = titleOfSite + sep + yearCreated + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardB() {
	finalReference = authorOrg + sep + yearCreated + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardC() {
	finalReference = authorOrg + sep + yearCreated + sep + titleOfDoc + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
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

function pickYearCreated() {
	window.alert("This feature is not yet available, sorry!");
	console.log("Error: No date picker available");
}

function pickDateAccessed() {
	window.alert("This feature is not yet available, sorry!");
	console.log("Error: No date picker available");
}

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