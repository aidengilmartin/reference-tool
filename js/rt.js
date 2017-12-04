var authorOrg, dateCreated, dateAccessed, titleOfSite, titleOfDoc, referenceURL, finalReference;

var sep = ". ";

function formSubmission() {
	collectDetails()
	getReferenceType();
	displayReference();
}

function getReferenceType() {
	var selector = document.getElementById("referenceType");
	var selectedRefType = selector[selector.selectedIndex].value;

	if (selectedRefType == "bhA") {
		frBangorHarvardA();
		console.log(selectedRefType);
	} 
	if (selectedRefType == "bhB") {
		frBangorHarvardB();
		console.log(selectedRefType);
	}
	if (selectedRefType == "bhC") {
		frBangorHarvardC();
		console.log(selectedRefType);
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
	finalReference = authorOrg + sep + dateCreated + sep + titleOfDoc +sep + titleOfSite + ". [Online]. " + "Available at: " + referenceURL + ". Accessed " + dateAccessed + ".";
}

function displayReference() {
	document.getElementById('formattedReference').innerHTML = finalReference;
}
