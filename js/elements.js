"use strict"

/* UI Controls */
const formatSelect = document.getElementById("referenceFormat");
const createButton = document.getElementById("create");
const outputTextBox = document.getElementById("outputText");
const historyClearButton = document.getElementById("historyClear");
const clipboardButton = document.getElementById('clipboard');
const clearAllButton = document.getElementById('clearAll');
const dateTodayButton = document.getElementById('dateToday');
const showExampleButton = document.getElementById('showExample');
const dateInput = document.getElementById('date');
const historyTable = document.getElementById('historyTable');
const historyCard = document.getElementById('historyCard');

/* Input Elements */

// /* Title of Website */
const titleOfWebsite = document.createElement('input');
titleOfWebsite.id = "titleOfWebsite";
titleOfWebsite.setAttribute("style", "display: none");
titleOfWebsite.setAttribute("type", "text");
titleOfWebsite.setAttribute("placeholder", "Title of Website");

/* Title of Document */
const titleOfDocument = document.createElement('input');
titleOfDocument.id = "titleOfDocument";
titleOfDocument.setAttribute("style", "display: none");
titleOfDocument.setAttribute("type", "text");
titleOfDocument.setAttribute("placeholder", "Title Of Document");

/* Video Title */
const videoTitle = document.createElement('input');
videoTitle.id = "videoTitle";
videoTitle.setAttribute("style", "display: none");
videoTitle.setAttribute("type", "text");
videoTitle.setAttribute("placeholder", "Title Of Video");

/* Author */
const author = document.createElement('input');
author.id = "author";
author.setAttribute("style", "display: none");
author.setAttribute("type", "text");
author.setAttribute("placeholder", "Author or Organization");

/* Creator */
const creator = document.createElement('input');
creator.id = "creator";
creator.setAttribute("style", "display: none");
creator.setAttribute("type", "text");
creator.setAttribute("placeholder", "Creator or Publisher");

/* Year Created */
const yearCreated = document.createElement('input');
yearCreated.id = "yearCreated";
yearCreated.setAttribute("style", "display: none");
yearCreated.setAttribute("type", "text");
yearCreated.setAttribute("placeholder", "Year Created");

/* URL */
const url = document.createElement('input');
url.id = "url";
url.setAttribute("style", "display: none");
url.setAttribute("type", "text");
url.setAttribute("placeholder", "URL (https://domain.com/page)");

/* Array of all elements for easy iteration */
const allElements = [titleOfWebsite, titleOfDocument, videoTitle, author, creator, yearCreated, url];