var authorOrg, dateCreated, titleOfSite, referenceURL, dateAccessed
var sep = ". ";
var online = "[Online]";
var avAt = "Available at: ";
var acc = "Accessed ";
var dateCreated = "2017";
var titleOfSite = "Google is adding Kotlin as an official programming language for Android development"
var referenceURL = "https://www.theverge.com/2017/5/17/15654988/google-jet-brains-kotlin-programming-language-android-development-io-2017";
var dateAccessed = "29th November 2017";

var finalReference = "";

function formSubmission() {
	collectDetails();
	frBangorHarvardB();
	displayReference();
}

function collectDetails() {
	authorOrg = document.getElementById("authorOrg").value;
	dateCreated = document.getElementById("dateCreated").value;
	titleOfSite = document.getElementById("titleOfSite").value;
	referenceURL = document.getElementById("referenceURL").value;
	dateAccessed = document.getElementById("dateAccessed").value;
}

function frBangorHarvardB() {
	finalReference = authorOrg + sep + dateCreated + sep + titleOfSite + sep + online + sep + avAt + referenceURL + sep + acc + dateAccessed + ".";
}

function displayReference() {
	document.getElementById('formattedReference').innerHTML = finalReference;
}