const reportCardContainer = document.querySelector(".report-container");
const timeFrameBtn = document.querySelectorAll(".time-btn");
let timeFrameObj =  {timeframe: "weekly", previoustext: "Last Week"};


const getReport = async () => {
      const res = await fetch("data.json");
      const data = await res.json();

      createReportCards(data);
}

const createReportCards = (data) => {
     

 reportCardContainer.innerHTML =  data.map(card => {

    const timeFrame = card.timeframes[timeFrameObj.timeframe];
    const previousText = timeFrameObj.previoustext;

      return `
        <div class="report-card" data-title="${card.title}">
         <div class="report-details">
          <span class="title">${card.title}</span>
          <span class="ellipsis">
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
          </span>
           <span class="current">${timeFrame.current}hrs</span>
            <p class="previous">${previousText} - ${timeFrame.previous}hrs</p>
         </div>
        </div>
      `
    }).join('');
}



function getTimeFrameObj(){
     
    if(this.tagName !== "BUTTON") return;

    timeFrameBtn.forEach((item)=> {item.classList.remove("active")});
    this.classList.add("active");
    timeFrameObj = this.dataset;
    return getReport();
}






timeFrameBtn.forEach((btn) => {btn.addEventListener("click", getTimeFrameObj)});

getReport();