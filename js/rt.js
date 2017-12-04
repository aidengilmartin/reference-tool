var authorOrg, dateCreated, dateAccessed, titleOfSite, titleOfDoc, referenceURL, finalReference;

var sep = ". ";

var selectedRefType;

function formSubmission() {
	collectDetails()
	selectReferenceType();
	doReferencing();
	displayReference();
	copyRefToClipboard();
}

function selectReferenceType() {
	var selector = document.getElementById("referenceType");
	selectedRefType = selector[selector.selectedIndex].value;
}

function refTypeChanged() {
	formSubmission();
	adjustElements();
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

function collectDetails() {
	authorOrg = document.getElementById("authorOrg").value;
	dateCreated = document.getElementById("dateCreated").value;
	dateAccessed = document.getElementById("dateAccessed").value;
	titleOfSite = document.getElementById("titleOfSite").value;
	titleOfDoc = document.getElementById("titleOfDoc").value;
	referenceURL = document.getElementById("referenceURL").value;
}

function formClear() {
	if (confirm("Are you sure?") == true) {
		document.getElementById("refForm").reset();
		document.getElementById("formattedReference").innerText = "";
	} else {
		// Do nothing
	} 
}

function frBangorHarvardA() {
	finalReference = titleOfSite + sep + dateCreated + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardB() {
	finalReference = authorOrg + sep + dateCreated + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function frBangorHarvardC() {
	finalReference = authorOrg + sep + dateCreated + sep + titleOfDoc + sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function displayReference() {
	document.getElementById('formattedReference').innerHTML = finalReference;
}

function copyRefToClipboard() {
	document.getElementById('formattedReference').value = finalReference;
	var clip = new Clipboard('.copyBtn');
	
	clip.on('success', function(e) {
		$('.copied').show();
			$('.copied').fadeOut(1000);
	});
}

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

function bhcElementsShow() {
	showContent("titleOfDoc");
}

function hideNonCommonElements() {
	hideContent("authorOrg", "titleOfSite", "titleOfDoc");
}

function hideContent() {
	if (arguments.length > 0) {
    	for (var i=0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).style.display = "none";
		}
	} 
}

function showContent() {
	if (arguments.length > 0) {
		for (var i=0; i < arguments.length; i++) {
			document.getElementById(arguments[i]).style.display = "block";
		}
	}
}