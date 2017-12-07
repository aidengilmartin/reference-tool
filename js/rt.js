var authorOrg, dateCreated, dateAccessed, titleOfSite, titleOfDoc, referenceURL, finalReference;

var sep = ". ";

var selectedRefType = "bhA";

function formSubmission() {
	collectDetails(); // Collect the users entry
	selectReferenceType(); // Find out and store what reference type the user has selected
	doReferencing(); // Create the reference and store it in a variable ready for display
	displayReference(); // Display the reference in a textarea
	clipboardBtnInit(); // Get the copy to clipboard button ready for the user to click it
}

function collectDetails() {
	authorOrg = document.getElementById("authorOrg").value;
	dateCreated = document.getElementById("dateCreated").value;
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
	formSubmission(); // Format the reference again and display it
	adjustElements(); // Hide of display any elements as needed
}

function formClear() {
	if (confirm("Are you sure?") == true) {
		document.getElementById("refForm").reset();
		document.getElementById("formattedReference").value = "";
	} else {
		// Do nothing
	} 
}

function formLoad() {
	selectReferenceType();
	adjustElements();
}

// Referencing formats

function frBangorHarvardA() {
	finalReference = titleOfSite + sep + dateCreated + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardB() {
	finalReference = authorOrg + sep + dateCreated + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardC() {
	finalReference = authorOrg + sep + dateCreated + sep + titleOfDoc + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
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
	showContent("dateCreated", "referenceURL", "dateAccessed", "titleOfSite");
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