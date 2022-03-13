"use strict";

const anchorTags = document.querySelectorAll("a");
const parentEl = document.querySelector(".list");
const boxes = document.querySelectorAll(".boxes");

anchorTags.forEach((ancTag) => {
  parentEl.addEventListener("click", (e) => {
    if (ancTag === e.target.closest("a")) {
      ancTag.classList.add("active");
      const id = ancTag.getAttribute("id");
      extractJSON(id);
    } else {
      ancTag.classList.remove("active");
    }
  });
});

const extractJSON = async function (id) {
  try {
    const rawData = await fetch("./data.json");
    const data = await rawData.json();

    data.forEach((el) => {
      const title = el.title;

      if (id === "daily") {
        const dailyData = el.timeframes.daily;
        const h1Text = `${dailyData.current}hrs`;
        const spanText = `Last week - ${dailyData.previous}hrs`;
        getCorrectBtn(title, h1Text, spanText);
      }

      if (id === "weekly") {
        const weeklyData = el.timeframes.weekly;
        const h1Text = `${weeklyData.current}hrs`;
        const spanText = `Last week - ${weeklyData.previous}hrs`;
        getCorrectBtn(title, h1Text, spanText);
      }
      if (id === "monthly") {
        const monthlyData = el.timeframes.monthly;
        const h1Text = `${monthlyData.current}hrs`;
        const spanText = `Last week - ${monthlyData.previous}hrs`;
        getCorrectBtn(title, h1Text, spanText);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const getCorrectBtn = function (title, h1Text, spanText) {
  boxes.forEach(function (box) {
    const uniqueID = box.getAttribute("id");

    if (uniqueID === title) {
      box.querySelector("h1").innerHTML = h1Text;
      box.querySelector("span").innerHTML = spanText;
    } else {
      return;
    }
  });
};
