import React from "react";
import Script from "next/script";

export default function FacebookChat() {
  return (
    <>
      <Script id="fb-chat-plugin" strategy="lazyOnload">
        {`
           window.fbAsyncInit = function() {
            FB.init({
              xfbml            : true,
              version          : 'v9.0'
            });
          };
  
          (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="103351901410077"
        theme_color="#7c7c7c"
        logged_in_greeting="Hi! How can we help you?"
        logged_out_greeting="Hi! How can we help you?"
        greeting_dialog_display="hide"
      ></div>
    </>
  );
}
