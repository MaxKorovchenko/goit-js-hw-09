const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]");let n=null;e.addEventListener("click",(function(e){n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.currentTarget.disabled=!0,e.currentTarget.nextElementSibling.disabled=!1})),t.addEventListener("click",(function(e){clearInterval(n),e.currentTarget.previousElementSibling.disabled=!1,e.currentTarget.disabled=!0})),t.disabled=!0;
//# sourceMappingURL=01-color-switcher.6005a624.js.map