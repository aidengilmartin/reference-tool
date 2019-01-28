"use strict"

const formats = {
    webA: {
        name:"Website without author",
        inputs:["titleOfWebsite", "yearCreated", "url"],
        example:"US files charges against China's Huawei and CFO Meng Wanzhou. 2019. [Online]. Available at: https://www.bbc.co.uk/news/world-us-canada-47036515. Accessed 28th January 2019.",
        create: function() {
            let output = (titleOfWebsite.value + ". " + yearCreated.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webB: {
        name:"Website with author or organization",
        inputs:["titleOfWebsite", "author", "yearCreated", "url"],
        example:"BBC. 2019. US files charges against China's Huawei and CFO Meng Wanzhou. [Online]. Available at: https://www.bbc.co.uk/news/world-us-canada-47036515. Accessed 28th January 2019.",
        create: function() {
            let output = (author.value + ". " + yearCreated.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
    webC: {
        name:"Document on website",
        inputs:["titleOfWebsite", "titleOfDocument", "author", "yearCreated", "url"],
        example:"Moritz Lipp et al. 2018. Meltdown: Reading Kernel Memory from User Space. Meltdown Attack. [Online]. Available at: https://meltdownattack.com/meltdown.pdf. Accessed 28th January 2019.",
        create: function() {
            let output = (author.value + ". " + yearCreated.value + ". " + titleOfDocument.value + ". " + titleOfWebsite.value + ". [Online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
	videoA: {
        name:"Online Video",
        inputs:["videoTitle", "creator", "yearCreated", "url"],
        example:"Computerphile. 2018. Spectre & Meltdown - Computerphile. [Video online]. Available at: https://www.youtube.com/watch?v=I5mRwzVvFGE. Accessed 28th January 2019.",
        create: function() {
            let output = (creator.value + ". " + yearCreated.value + ". " + videoTitle.value + ". [Video online]. " + "Available at: " + url.value + ". Accessed " + date.value + ".");
            return output;
        },
    },
}