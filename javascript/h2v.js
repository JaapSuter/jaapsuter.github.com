// http://h2v.1daylater.com/
// Copyright 2010, David King
// Released under the DBACE licence (Don't Be A Cock End)

H2V={};H2V.div=document.createElement("div");H2V.form=document.createElement("form");H2V.form.setAttribute("target","_blank");H2V.form.setAttribute("method","POST");H2V.form.style.display="none";H2V.textarea=document.createElement("textarea");H2V.textarea.setAttribute("name","snippet");H2V.regex=/(vcard|vevent)/i;H2V.findH=function(el){while(el){el=el.parentNode;var m=H2V.regex.exec(el.className);if(m!==null){H2V.div.innerHTML="";H2V.div.appendChild(el.cloneNode(true));return({format:m[0],snippet:H2V.div.innerHTML});}
if(el.nodeName.toLowerCase()=="html"){break;}}
return false;};H2V.download=function(el){var h=H2V.findH(el);if(h){H2V.form.setAttribute("action","http://h2v.1daylater.com/"+h.format);H2V.form.innerHTML="";H2V.textarea.value=h.snippet;H2V.form.appendChild(H2V.textarea);H2V.form.submit();}else{alert("It seems we're having trouble downloading this, please contact the site administrator");}
return false;};