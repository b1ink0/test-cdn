//? account-widget-script.js version: 1

let shopDomain_reward_page;
let customerId_reward_page;
if (__st.cid !== undefined) {
  customerId_reward_page = __st.cid;
}
shopDomain_reward_page = Shopify.shop;

// let shopDomain_reward_page = "super-me-raj.myshopify.com";
// let customerId_reward_page;
// = 6002977997054;

//? main part starts here
let rewardsPageIframeWrapperDiv = document.getElementById("super-rewards-page");
// let rewardsPageIframeWrapperDiv = document.body;
rewardsPageIframeWrapperDiv.style.cssText = `
margin: 0;
box-sizing: border-box;
width: 100%;
   `;

let rewardsPageIframe = document.createElement("iframe");
rewardsPageIframe.name = "super-rewards-page-iframe";

//? Dev
rewardsPageIframe.src = `http://localhost:4000/?shopDomain=${shopDomain_reward_page}&customerId=${customerId_reward_page}`;

rewardsPageIframe.allow = "clipboard-write; clipboard-read;";
rewardsPageIframe.scrolling = "no";
rewardsPageIframe.style.cssText = "width:100%; border:none;";
rewardsPageIframe.style.fontFamily =
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-stack-body") || "sans-serif";

rewardsPageIframeWrapperDiv.appendChild(rewardsPageIframe);

// postmessage Event from account-widget
function getIframeFullHeight(e) {
  if (typeof e.data == "object" && e.data?.height) {
    rewardsPageIframe.height = e.data.height + "px";
    console.log(rewardsPageIframe.height);
  }
}
window.addEventListener("message", getIframeFullHeight, false);

// console.log(
//   window
//     .getComputedStyle(document.documentElement)
//     .getPropertyValue("--font-stack-body")
// );
