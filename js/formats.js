"use strict"

const formats = {
    webA: {
        name:"Website without author",
        inputs:["titleOfWebsite", "yearCreated", "url"],
        create: function() {
            let output = (titleOfWebsite.value + ". " + yearCreated.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webB: {
        name:"Website with author or organization",
        inputs:["titleOfWebsite", "author", "yearCreated", "url"],
        create: function() {
            let output = (author.value + ". " + yearCreated.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webC: {
        name:"Document on website",
        inputs:["titleOfWebsite", "titleOfDocument", "author", "yearCreated", "url"],
        create: function() {
            let output = (author.value + ". " + yearCreated.value + ". " + titleOfDocument.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
	videoA: {
        name:"Online Video",
        inputs:["videoTitle", "creator", "yearCreated", "url"],
        create: function() {
            let output = (creator.value + ". " + yearCreated.value + ". " + videoTitle.value + ". [Video online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
}