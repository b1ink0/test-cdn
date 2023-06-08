// react-widget-script.js version: 1.1
let BACKEND_URL = "https://around-eu-mass-years.trycloudflare.com";
let shopDomain_rs;
let customerId_rs;
if (__st.cid !== undefined) {
  customerId_rs = __st.cid;
}
shopDomain_rs = Shopify.shop;
let pLocation = window.location.host;
// let BACKEND_URL = "http://localhost:8080";

let launcherIconData;

//nudge script
let script_nudge = document.createElement("script");
script_nudge.src =
  "https://cdn.jsdelivr.net/gh/b1ink0/test-cdn/nudges.js";
// document.body.appendChild(script_nudge);

//? poppins font
let fontLink_rs = document.createElement("link");
fontLink_rs.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap";
fontLink_rs.rel = "stylesheet";
document.body.appendChild(fontLink_rs);

let styleRewards = document.createElement("style");
styleRewards.textContent = `
@keyframes superFadeScaleIn {
  0% {
    opacity: 0;
    transform: scale(.8);
    visibility: hidden;
  }
  100% {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
}
@keyframes superFadeSlideUp {
  0% {
    opacity: 0;
    transform: translate3d(0,10px,0);
}
100% {
    opacity: 1;
    transform: translateZ(0);
}
}
@keyframes superFadeSlideDown {
  0% {
    opacity: 1;
    transform: translateZ(0);
}
100% {
    opacity: 0;
    transform: translate3d(0,10px,0);
}
}

.super-slide-up{
  -webkit-animation: superFadeSlideUp .2s ease-in!important;
  animation: superFadeSlideUp .2s ease-in!important;
}
.super-slide-down{
  -webkit-animation: superFadeSlideDown .2s ease-in!important;
animation: superFadeSlideDown .2s ease-in!important;
}

`;
document.body.appendChild(styleRewards);

//? main part starts here
let iframeWrapperDiv = document.createElement("div");
iframeWrapperDiv.setAttribute("id", "rewards-widget");
iframeWrapperDiv.style.cssText = `
   height: calc(100% - 120px);
   max-height: 600px;
   width:360px;
   position:fixed;
   bottom:0;
   z-index : 2147483647 !important;
   border-radius:10px;
   overflow:hidden;
   box-shadow: 0 0 80px 20px rgb(0 0 0 / 12%);
  // display:none;
  -webkit-animation: superFadeSlideUp .2s ease-in!important;
  animation: superFadeSlideUp .2s ease-in!important;
  background-color: #ffffff;
   `;

document.body.appendChild(iframeWrapperDiv);

let iframe = document.createElement("iframe");
iframe.name = "rewards-widget-iframe";

//? Prod
// iframe.src = `https://reward-cloudfront.superassistant.io/?shopDomain=${shopDomain_rs}&customerId=${customerId_rs}&parentLocation=${pLocation}`;
//? stage
// iframe.src = `https://reward-cloudfront-test.superassistant.io/?shopDomain=${shopDomain_rs}&customerId=${customerId_rs}&parentLocation=${pLocation}`;
//? Dev
iframe.src = `http://localhost:3002/?shopDomain=${shopDomain_rs}&customerId=${customerId_rs}&parentLocation=${pLocation}`;

iframe.allow = "clipboard-write; clipboard-read;";

iframeWrapperDiv.appendChild(iframe);

// media query event handler
if (window.matchMedia) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addListener(handleMobileChange);
  handleMobileChange(mq);
}

iframe.style.cssText = "width:100%; height: 100%; border:none;";

iframeWrapperDiv.appendChild(iframe);

//? launcher button
let launcherDiv = document.createElement("div");
launcherDiv.setAttribute("id", "launcher");

launcherDiv.style.cssText = `
   height:60px;
   min-width:60px;
   position:fixed;
   bottom:0;
   z-index:2147483646 !important;
   border-radius:50px;
   margin: 0 20px 20px 0;
   font-size:20px;
   display:flex;
   justify-content:center;
   align-items:center;
   cursor:pointer;
   box-shadow: 0 0 80px 0 rgb(0 0 0 / 12%);
   -webkit-animation: superFadeScaleIn .2s ease-in-out!important;
    animation: superFadeScaleIn .2s ease-in-out!important;
    -webkit-animation-delay: .15s!important;
    animation-delay: .15s!important;
    -webkit-animation-fill-mode: forwards!important;
    animation-fill-mode: forwards!important;
    transition: all .2s ease-in-out!important;

   `;

let launcherIcon = document.createElement("img");

launcherIcon.style.cssText += `
width:30px;
height:30px
`;
launcherDiv.appendChild(launcherIcon);

let launcherText = document.createElement("span");

launcherText.style.cssText += `
font-weight: 400;
font-size: 16px;
margin: 0  0  0 12px;
font-family: 'Poppins', sans-serif;
`;
launcherDiv.appendChild(launcherText);

launcherDiv.addEventListener("click", () => {
  // remove location hash
  removeLocationHash();

  if (iframeWrapperDiv.style.display === "none") {
    iframeWrapperDiv.style.display = "initial";
    launcherIcon.style.display = "initial";
    launcherIcon.src =
      "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23FFF' fill-rule='nonzero' d='M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z'/%3E%3C/svg%3E";
    launcherText.textContent = "";
    launcherDiv.style.padding = "0";
    launcherText.style.display = "none";
  } else {
    launcherIconData?.textVisible === "text"
      ? (launcherIcon.style.display = "none")
      : (launcherIcon.style.display = "initial");
    // iframeWrapperDiv.classList.add("super-slide-down");
    iframeWrapperDiv.style.display = "none";
    setLauncherIcon(launcherIconData);
    launcherText.textContent = launcherIconData.widgetText;
    launcherIconData?.textVisible === "both" ||
    launcherIconData?.textVisible === "text"
      ? (launcherDiv.style.padding = "0 20px")
      : (launcherDiv.style.padding = "0");
    launcherIconData?.textVisible === "both" ||
    launcherIconData?.textVisible === "text"
      ? (launcherText.style.display = "initial")
      : (launcherText.style.display = "none");
  }
});

function setLauncherIcon(launcherIconData) {
  switch (launcherIconData?.widgetIcon) {
    case "fa-gift":
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/present.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;
    case "fa-shopping-bag":
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/bag.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;
    case "fa-tags":
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/tag.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;
    case "fa-crown":
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/crown.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;
    case "fa-star":
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/star.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;

    default:
      launcherIcon.src = `https://cdn.sweettooth.io/v1/images/launcher_icons/present.svg?color=%23${launcherIconData?.font?.slice(
        1
      )}`;
      break;
  }
}

//? Media Queries
const mediaQuery = window.matchMedia("(max-width: 550px)");

function handleMobileChange(e, postition) {
  // Check if the media query is true
  if (e.matches) {
    iframeWrapperDiv.style.cssText += `
    width: 100%;
    height: 100%;
    max-height: 100vh;
    max-width: 100vw;
    margin: 0;
    inset:0; 
    border-radius: 0;
    `;
  } else {
    iframeWrapperDiv.style.cssText += `
   height: calc(100% - 120px);
   max-height: 600px;
   width:360px;
   inset:unset;
   ${postition}
   bottom:0;
   border-radius:10px;
   `;
  }
}

// Register event listener
mediaQuery.addListener(handleMobileChange);

(async function getLauncherInfo() {
  let res = await fetch(
    `${BACKEND_URL}/launcher-icon?shopDomain=${shopDomain_rs}&customerId=${customerId_rs}`
  );
  let data = await res.json();
  // console.log(data);

  (data?.isPointsActive ||
    data?.isReferralsActive ||
    data?.isGiftcardsActive) &&
    (data?.isPopupWidgetActive ?? true) &&
    !data?.isCustomerBan &&
    document.body.appendChild(launcherDiv);

  launcherIconData = data.theme;

  launcherDiv.style.color = launcherIconData?.font;
  launcherDiv.style.backgroundColor = launcherIconData?.hexColor;
  if (launcherIconData?.placement === "right") {
    launcherDiv.style.right = "0";
    launcherDiv.style.margin = `0 ${launcherIconData.positionSide}px ${launcherIconData.positionBottom}px 0`;
    iframeWrapperDiv.style.right = "0";
    iframeWrapperDiv.style.margin = `0 ${launcherIconData.positionSide}px ${
      parseInt(launcherIconData.positionBottom) + 82
    }px 0`;
  } else {
    launcherDiv.style.left = "0";
    launcherDiv.style.margin = `0 0 ${launcherIconData?.positionBottom}px ${launcherIconData?.positionSide}px`;
    iframeWrapperDiv.style.left = "0";
    iframeWrapperDiv.style.margin = `0 0 ${
      parseInt(launcherIconData?.positionBottom) + 82
    }px ${launcherIconData.positionSide}px`;
  }

  setLauncherIcon(data.theme);
  switch (launcherIconData?.textVisible) {
    case "both":
      launcherText.style.display = "initial";
      launcherText.textContent = launcherIconData?.widgetText;
      launcherDiv.style.padding = "0 20px";
      break;
    case "text":
      launcherText.style.display = "initial";
      launcherText.textContent = launcherIconData?.widgetText;
      launcherDiv.style.padding = "0 20px";
      launcherIcon.style.display = "none";
      break;
    case "icon":
      launcherText.textContent = "";
      launcherDiv.style.padding = "0";
      launcherText.style.display = "none";
      break;

    default:
      launcherText.style.display = "none";
      break;
  }

  // if (
  //   launcherIconData?.textVisible === "both" ||
  //   launcherIconData?.textVisible === "text"
  // ) {
  //   console.log("both");
  //   launcherText.style.display = "initial";
  //   launcherText.textContent = launcherIconData?.widgetText;
  //   launcherDiv.style.padding = "0 20px";
  // } else {
  //   console.log("icon");
  //   launcherText.textContent = "";
  //   launcherDiv.style.padding = "0";
  //   launcherText.style.display = "none";
  // }
  handleMobileChange(
    mediaQuery,
    launcherIconData?.placement === "right" ? "right:0;" : "left:0;"
  );
})();

// iframe event
function sendMessageToIframe() {
  console.log("sendMessageToIframe");

  try {
    let win = iframe.contentWindow;
    win.postMessage(
      {
        shopDomain: shopDomain_rs,
        customerId: customerId_rs,
        parentLocation: window.location.host,
      },
      "https://reward-cloudfront-test.superassistant.io"
    );
    console.log("try");
    console.log(win);
  } catch (error) {
    console.log("err", error);
    let win = iframe.contentWindow;
    win.contentWindow.postMessage(
      {
        shopDomain: shopDomain_rs,
        customerId: customerId_rs,
        parentLocation: window.location.host,
      },
      "*"
    );
  }
}
// postmessage Event from react-widget
function getData(e) {
  if (typeof e.data == "object" && e.data?.display) {
    iframeWrapperDiv.style.display = e.data.display;

    // remove location hash
    removeLocationHash();
    if (e.data.display === "none") {
      setLauncherIcon(launcherIconData);
      launcherText.textContent = launcherIconData?.widgetText;
      launcherIconData?.textVisible === "both" ||
      launcherIconData?.textVisible === "text"
        ? (launcherDiv.style.padding = "0 20px")
        : (launcherDiv.style.padding = "0");
      launcherIconData?.textVisible === "both" ||
      launcherIconData?.textVisible === "text"
        ? (launcherText.style.display = "initial")
        : (launcherText.style.display = "none");
    } else {
      iframeWrapperDiv.style.display = "initial";
      launcherIcon.style.display = "initial";
      launcherIcon.src =
        "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23FFF' fill-rule='nonzero' d='M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z'/%3E%3C/svg%3E";
      launcherText.textContent = "";
      launcherDiv.style.padding = "0";
      launcherText.style.display = "none";
    }
  }
}
window.addEventListener("message", getData, false);

// referral event
let referralEventInterval = setInterval(async () => {
  let referrerCode = localStorage.getItem("SA_rewards_ref");
  let isReferralsReward = localStorage.getItem("Referral_reward");
  // console.log("setInterval");

  if (referrerCode !== null && customerId_rs && isReferralsReward === null) {
    console.log("setInterval in");

    localStorage.removeItem("SA_rewards_ref");
    localStorage.setItem("Referral_reward", true);
    await fetch(
      `${BACKEND_URL}/referral-reward/${customerId_rs}?shopDomain=${shopDomain_rs}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrerCode,
        }),
      }
    );
  }
}, 5000);

function sendHashToIframe(hash) {
  let win = iframe.contentWindow;
  win.postMessage(
    {
      superHash: hash,
    },
    "*"
  );
}

function removeLocationHash() {
  var uri = window.location.toString();
  var clean_uri = uri.substring(0, uri.indexOf("#"));
  window.history.replaceState({}, document.title, clean_uri);
}

// sending hash to iframe
let locationHashInterval = setInterval(() => {
  sendHashToIframe(window.location.hash);
}, 500);
