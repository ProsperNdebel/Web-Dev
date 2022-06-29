"use strict";
//importing the JSON file
import myData from "./data.json" assert { type: "json" };

//grabbing all the things I will need from then the html file
const link1 = document.getElementById("daily");
const link2 = document.getElementById("weekly");
const link3 = document.getElementById("monthly");
const container = document.querySelector(".container"); //I append the dynamically edited html to this container
//const myData = JSON.parse("data");

const links_arr = [link1, link2, link3];
links_arr.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (
      ["daily", "weekly", "monthly"].includes(
        e.target.textContent.toLowerCase()
      )
    ) {
      const accesser = e.target.textContent.toLowerCase();
      let time = "";
      if (accesser[0] === "m") {
        time = "Month";
      } else if (accesser[0] === "w") {
        time = "Week";
      } else {
        time = "Day";
      }
      //I need to loop through the mydata json file and access the values to put them in the html through template strings
      /*Thought Process
      I will have the text that I wanna change as I loop through the myData json file]
      this text is a text common to all the the divs with an id of bottom-text--{0-6}, where the numbers 0 - 6 are dynamivally updated as the loop continues 
      I will use a for of loop so that I have an index for helping me grab the div by its id number
      Then then I will edit the content I wanna edit and then append it to the div
      Lastly I will insert the final div into the web page*/
      let i = 0;
      for (const obj of myData) {
        const targetDiv = document.getElementById(`bottom-text--${i}`);

        const editedDiv = `<h2 class="hours-text">${obj.timeframes[accesser].current}hrs</h2>
        <p class="date-text">Last  ${time} - ${obj.timeframes[accesser].previous}hrs</p>`;

        i++;

        targetDiv.innerHTML = editedDiv;
      }
    }
  });
});
