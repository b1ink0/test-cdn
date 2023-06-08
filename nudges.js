// Nudges referral and signup v1 final
let customer_nudge = {}; /*our current logged in customer */
let merchant_nudge = {}; /*The merchant/store owner  */
let symbol_nudge;
let isMobile = window.innerWidth <= 450;

//! for dev testing
// let customerId_rs = undefined;
// let shopDomain_rs = "super-neil-test.myshopify.com";
// let BACKEND_URL = "https://rewards-backend.superassistant.io";

(async function fetchMerchantUser() {
  if (customerId_rs) {
    const res = await fetch(
      `${BACKEND_URL}/points/${customerId_rs}?shopDomain=${shopDomain_rs}`
    );
    const data = await res.json();
    // console.log(data);
    customer_nudge = data.customer;
    merchant_nudge = data.merchant;
    symbol_nudge = merchant_nudge.currency.symbol.replace(/<[^>]+>/g, "");
    symbol_nudge = symbol_nudge.replace(/{{\b\w+}}/g, "");

    appendNudges();
  } else {
    const res = await fetch(
      `${BACKEND_URL}/merchant-info/?shopDomain=${shopDomain_rs}`
    );
    const data = await res.json();
    // console.log(data);
    merchant_nudge = data;
    symbol_nudge = merchant_nudge.currency.symbol.replace(/<[^>]+>/g, "");
    symbol_nudge = symbol_nudge.replace(/{{\b\w+}}/g, "");

    appendNudges();
  }
})();

//jquery scripts
// let script_jquery = document.createElement("script");
// script_jquery.src =
//   "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
// script_jquery.crossOrigin = "anonymous";
// document.body.appendChild(script_jquery);

function appendNudges() {
  /* set timeout nudge */
  //-- social sharing card
  refContainer = document.createElement("div");
  refContainer.id = "social-sharing";
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-top:25px;
  margin-left:auto;
  margin-right:auto;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position:fixed;
  bottom:60px;
  right:${isMobile ? "0px" : "50px"} ;
  z-index:1000;
  width: 300px;
  display:none;
  font-family: 'Poppins', sans-serif;`;
  document.body.appendChild(refContainer);

  if (isMobile) {
    refContainer.style.cssText += `
    left:0px;`;
  }

  cross = document.createElement("img");
  cross.src =
    "data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23333d47' fill-rule='nonzero' d='M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z'/></svg>";
  cross.style.cssText += `
  width: 40px;
  height: 40px; 
  padding:10px;
  position:absolute;
  right:0px;
  top:0px;
  cursor:pointer;
  `;

  cross.onclick = function () {
    let box = document.getElementById("social-sharing");
    box.style.display = "none";
    // $("#social-sharing").fadeOut("slow");
    localStorage.setItem("sa_nudge_shown", true);
  };
  refContainer.appendChild(cross);

  reward_img = document.createElement("img");
  reward_img.src = `https://res.cloudinary.com/dl3nzdely/image/upload/v1626161385/gift-img_v4kmed.jpg`;
  reward_img.alt = `reward_img`;
  reward_img.style.cssText += `
  width:60px;`;
  refContainer.appendChild(reward_img);

  social_p1 = document.createElement("p");
  social_p1.textContent =
    merchant_nudge.referralNudge?.title || "Refer friends and get rewarded";
  social_p1.style.cssText += `
  font-size: 14px;
  color:#000;
  font-weight: 500;
  margin:8px 0px;
  text-align: center`;
  refContainer.appendChild(social_p1);

  let couponValue = symbol_nudge + merchant_nudge.friendAmt;

  let couponValue_advocate = symbol_nudge + merchant_nudge.advocateAmt;

  let referralMessage = `${couponValue} off coupon`;
  if (merchant_nudge.friendType === "percentage") {
    referralMessage = `${merchant_nudge.friendAmt} % off coupon`;
  }

  let referralMessage_advocate = `${couponValue_advocate} off coupon`;
  if (merchant_nudge.advocateType === "percentage") {
    referralMessage_advocate = `${merchant_nudge.advocateAmt} % off coupon`;
  }

  social_p2 = document.createElement("span");
  social_p2.textContent =
    merchant_nudge.referralNudge?.desc ||
    `Share this link to give your friends ${referralMessage}. We'll send you ${referralMessage_advocate}
  when they make a purchase.`;
  social_p2.style.cssText += `
  font-size: 11px;
  text-align: center;
  margin:8px 0px;
  font-weight:300;`;
  refContainer.appendChild(social_p2);

  refLink = document.createElement("div");
  refLink.style.cssText += `padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  font-size: 11px;
  cursor: pointer;
  color: #637381;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;`;
  customerId_rs ? refContainer.appendChild(refLink) : null;

  span = document.createElement("span");
  span.textContent = merchant_nudge.referralLink
    ? `${merchant_nudge.referralLink}?ref=${customer_nudge.referralCode}`
    : `https://${shopDomain_rs}/?ref=${customer_nudge.referralCode}`;
  span.style.textAlign = "left";
  refLink.appendChild(span);

  refLink.onclick = function () {
    navigator.clipboard.writeText(span.textContent);
  };

  copy = document.createElement("icon");
  copy.style.cssText += `font-size: 13px;margin-left: 10px;`;
  copy.classList.add("far", "fa-clipboard");
  copy.addEventListener("click", function (event) {
    document.execCommand("copy");
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener("copy", function (event) {
    event.preventDefault();
    const link = merchant_nudge.referralLink
      ? `${merchant_nudge.referralLink}?ref=${customer_nudge.referralCode}`
      : `https://${shopDomain_rs}/?ref=${customer_nudge.referralCode}`;
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", link);
    }
  });
  refLink.appendChild(copy);

  socialIconsContainer = document.createElement("div");
  socialIconsContainer.style.cssText += `
  display:flex;
  justify-content:center;
  align-items: center;
  width:100%;
  margin-top:12px;`;
  refContainer.appendChild(socialIconsContainer);

  let referral_link = merchant_nudge.referralLink
    ? `${merchant_nudge.referralLink}?ref=${customer_nudge.referralCode}`
    : `https://${shopDomain_rs}/?ref=${customer_nudge.referralCode}`;

  iconLink_f = document.createElement("a");
  iconLink_f.href = `https://facebook.com/sharer/sharer.php?u=${referral_link}`;
  iconLink_f.target = "_blank";
  iconLink_f.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_f);

  icon_f = document.createElement("i");
  icon_f.classList.add("fab", "fa-facebook-square");
  icon_f.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_f.appendChild(icon_f);

  iconLink_t = document.createElement("a");
  iconLink_t.href = `https://twitter.com/share?text=Visit ${merchant_nudge.name} using my link and get a special coupon.
  &url=${referral_link}`;
  iconLink_t.target = "_blank";
  iconLink_t.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_t);

  icon_t = document.createElement("i");
  icon_t.classList.add("fab", "fa-twitter");
  icon_t.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_t.appendChild(icon_t);

  iconLink_w = document.createElement("a");
  iconLink_w.href = `https://wa.me?text=Visit ${merchant_nudge.name} using my link and get a special coupon. ${referral_link}`;
  iconLink_w.target = "_blank";
  iconLink_w.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_w);

  icon_w = document.createElement("i");
  icon_w.classList.add("fab", "fa-whatsapp-square");
  icon_w.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_w.appendChild(icon_w);

  let nudgeTimeout;
  if (merchant_nudge.referralNudgeTime === "instant") {
    nudgeTimeout = 1000;
  } else {
    nudgeTimeout = parseInt(merchant_nudge.referralNudgeTime)
      ? parseInt(merchant_nudge.referralNudgeTime) * 1000
      : 1000;
  }

  let showNudgeOnPage;
  if (merchant_nudge.referralNudge?.pages === "all") {
    showNudgeOnPage = customerId_rs && true;
  } else {
    showNudgeOnPage = Shopify.Checkout !== undefined; //! uncomment this on prod
  }

  let showNudge = localStorage.getItem("sa_nudge_shown")
    ? !JSON.parse(localStorage.getItem("sa_nudge_shown"))
    : true;

  merchant_nudge.isReferralsActive &&
    showNudge &&
    showNudgeOnPage &&
    setTimeout(function () {
      let box = document.getElementById("social-sharing");
      box.style.display = "flex";
      localStorage.setItem("sa_nudge_shown", true);
    }, nudgeTimeout);

  /*Nudge logged out users */
  refContainer = document.createElement("div");
  refContainer.id = "nudge-signup";
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-top:25px;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position:fixed;
  bottom:50px;
  right: 50px;
  z-index:1000;
  width: 300px;
  display:none;
  margin:auto;
  font-family: 'Poppins', sans-serif;`;
  document.body.appendChild(refContainer);

  if (isMobile) {
    refContainer.style.cssText += `
    left:0px;
    right:0px;`;
  }

  cross = document.createElement("img");
  cross.src =
    "data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23333d47' fill-rule='nonzero' d='M11.06 10l3.713 3.712a.75.75 0 0 1-1.06 1.061L10 11.061l-3.712 3.712a.75.75 0 0 1-1.061-1.06L8.939 10 5.227 6.288a.75.75 0 1 1 1.06-1.061L10 8.939l3.712-3.712a.75.75 0 0 1 1.061 1.06L11.061 10z'/></svg>";
  cross.style.cssText += `
  width: 40px;
  height: 40px; 
  padding:10px;
  position:absolute;
  right:0px;
  top:0px;
  cursor:pointer;
  `;

  cross.onclick = function () {
    document.getElementById("nudge-signup").style.display = "none";
    // $("#nudge-signup").fadeOut("slow");
    localStorage.setItem("sa_signup_nudge_shown", true);
  };
  refContainer.appendChild(cross);

  reward_img = document.createElement("img");
  reward_img.src = merchant_nudge.theme?.nudge?.image
    ? merchant_nudge?.theme?.nudge?.image?.location
    : `https://super-rewards--images.s3.ap-south-1.amazonaws.com/internal-images/kindpng_2442880.png`;
  reward_img.alt = `reward_img`;
  reward_img.style.cssText += `
  width:60px;
  height:60px;
  border:1px solid #e5e5e5;
  padding:4px;
  border-radius: 50%;
  `;
  refContainer.appendChild(reward_img);

  social_p1 = document.createElement("p");
  social_p1.textContent = merchant_nudge.theme?.nudge?.title || "Hey there!";
  social_p1.style.cssText += `
  font-size: 14px;
  color:#000;
  font-weight: 500;
  margin:8px 0px;
  text-align: center`;
  refContainer.appendChild(social_p1);

  social_p2 = document.createElement("span");
  social_p2.textContent =
    merchant_nudge.theme?.nudge?.desc ||
    "Create an account and you can earn points and reward coupons.";
  social_p2.style.cssText += `
  font-size: 11px;
  text-align: center;
  margin:8px 0px;
  font-weight:300;`;
  refContainer.appendChild(social_p2);

  joinNowButton = document.createElement("a");
  joinNowButton.style.cssText += `
  border: 1px solid;
  border-radius: 8px;
  padding: 10px 24px;
  color: ${merchant_nudge?.theme?.hexColor || "#7D52DA"};
  font-size: 12px;
  margin: 8px 0px;
  font-family: 'Poppins', sans-serif;;
  cursor:pointer;
  text-decoration: none;
  `;
  joinNowButton.href =
    `https://${shopDomain_rs}/account/register` +
    (localStorage.getItem("SA_rewards_ref")
      ? `?ref=${localStorage.getItem("SA_rewards_ref")}`
      : "");
  joinNowButton.textContent = "Join Now";
  refContainer.appendChild(joinNowButton);

  let signupNudgeTime = 1000;
  if (merchant_nudge.theme?.nudge?.timeout === "instant") {
    signupNudgeTime = 1000;
  } else {
    signupNudgeTime = parseInt(merchant_nudge.theme?.nudge?.timeout)
      ? parseInt(merchant_nudge.theme?.nudge?.timeout) * 1000
      : 1000;
  }

  let showSignupNudge = localStorage.getItem("sa_signup_nudge_shown")
    ? !JSON.parse(localStorage.getItem("sa_signup_nudge_shown"))
    : true;

  !customerId_rs &&
    merchant_nudge.theme?.nudge?.status &&
    showSignupNudge &&
    setTimeout(function () {
      let box = document.getElementById("nudge-signup");
      box.style.display = "flex";
      localStorage.setItem("sa_signup_nudge_shown", true);
    }, signupNudgeTime);
}
