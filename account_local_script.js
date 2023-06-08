//? account-widget-script.js version: 1

let shopDomain_ar;
let customerId_ar;
if (__st.cid !== undefined) {
  customerId_ar = __st.cid;
}
shopDomain_ar = Shopify.shop;

// let BACKEND_URL = "https://geometry-rca-zoo-british.trycloudflare.com";
// let BACKEND_URL = "http://localhost:8080";

//? main part starts here
// let accountRewardsIframeWrapperDiv = document.getElementById("account-rewards");
let accountRewardsIframeWrapperDiv = document.body;
accountRewardsIframeWrapperDiv.style.cssText = `
margin: 0;
box-sizing: border-box;
width: 100%;
   `;

let accountRewardsIframe = document.createElement("iframe");
accountRewardsIframe.name = "account-rewards-widget-iframe";

//? Prod
// accountRewardsIframe.src = `https://reward-cloudfront.superassistant.io/?shopDomain=${shopDomain_ar}&customerId=${customerId_ar}`;
//? stage
// accountRewardsIframe.src = `https://reward-cloudfront-test.superassistant.io/?shopDomain=${shopDomain_ar}&customerId=${customerId_ar}`;
//? Dev
accountRewardsIframe.src = `http://localhost:3004/?shopDomain=${shopDomain_ar}&customerId=${customerId_ar}`;

accountRewardsIframe.allow = "clipboard-write; clipboard-read;";
accountRewardsIframe.scrolling = "no";
accountRewardsIframe.style.cssText = "width:100%; border:none;";
accountRewardsIframe.style.fontFamily =
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-stack-body") || "sans-serif";

accountRewardsIframeWrapperDiv.appendChild(accountRewardsIframe);

// postmessage Event from account-widget
function getIframeFullHeight(e) {
  if (typeof e.data == "object" && e.data?.height) {
    accountRewardsIframe.height = e.data.height + "px";
    console.log(accountRewardsIframe.height);
  }
}
window.addEventListener("message", getIframeFullHeight, false);

// console.log(
//   window
//     .getComputedStyle(document.documentElement)
//     .getPropertyValue("--font-stack-body")
// );
