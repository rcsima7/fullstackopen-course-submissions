(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t(1),a=t(14),r=t.n(a),u=t(3),i=function(e){return console.log(e),Object(o.jsxs)("div",{children:["filter shown with: ",Object(o.jsx)("input",{value:e.value,onChange:e.onChange})]})},l=function(e){return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Add A New:"}),Object(o.jsxs)("form",{onSubmit:e.onSubmitName,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:e.valueName,onChange:e.onChangeName})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:e.valueNumber,onChange:e.onChangeNumber})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})]})},s=function(e){var n=e.name,t=e.deleteName;return Object(o.jsxs)("li",{children:[n.name," ",n.number,Object(o.jsx)("button",{onClick:t,children:"Delete"})]})},d=function(e){return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Numbers:"}),Object(o.jsx)("ul",{children:e.namesToShow.map((function(n){return Object(o.jsx)(s,{name:n,deleteName:function(){return e.deleteName(n.id)}},n.id)}))})]})},b=t(4),j=t.n(b),h="api/persons",m=function(){return j.a.get(h).then((function(e){return e.data}))},f=function(e){return j.a.post(h,e).then((function(e){return e.data}))},O=function(e){return j.a.delete("".concat(h,"/").concat(e)).then((function(e){return console.log(e)}))},g=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),s=Object(u.a)(r,2),b=s[0],j=s[1],h=Object(c.useState)(""),g=Object(u.a)(h,2),v=g[0],x=g[1],p=Object(c.useState)(""),N=Object(u.a)(p,2),w=N[0],S=N[1],k=Object(c.useState)(null),C=Object(u.a)(k,2),y=C[0],P=C[1];Object(c.useEffect)((function(){m().then((function(e){a(e)}))}),[]);var D=t.find((function(e){return e.name===w}))?t.filter((function(e){return e.name===w})):t,T=function(e){var n=e.message;return null===n?null:Object(o.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:n})};return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:"Phonebook"}),Object(o.jsx)(T,{message:y}),Object(o.jsx)(i,{value:w,onChange:function(e){console.log(e.target.value),S(e.target.value)}}),Object(o.jsx)(l,{onSubmitName:function(e){if(e.preventDefault(),0===b.length)window.alert("Please add a name before clicking add");else{var n={name:b,number:v};t.filter((function(e){return e.name===b})).length>0?window.alert("".concat(b," is already added to Phonebook")):f(n).then((function(e){a(t.concat(e)),j(""),x(""),P("'".concat(e.name,"' was added to Phonebook")),setTimeout((function(){P(null)}),5e3)}))}},valueName:b,onChangeName:function(e){console.log(e.target.value),j(e.target.value)},valueNumber:v,onChangeNumber:function(e){console.log(e.target.value),x(e.target.value)}}),Object(o.jsx)(d,{namesToShow:D,deleteName:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))?O(e).then(console.log("deleted person ".concat(e)),a(t.filter((function(n){return n.id!==e})))):console.log("person ".concat(e," was not deleted"))}})]})};r.a.render(Object(o.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.ab5dff13.chunk.js.map