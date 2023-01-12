import jsdom from 'jsdom'

// 用 jsdom 解析并抓取动态页面（通过 js 动态生成的页面，如 vue）

const jqueryPath = './node_modules/jquery/dist/jquery.js';
// 这段 html 中一些内容是通过 js 生成的
const html = ` 
<div class="book"> 
 <h2></h2>
 <h3></h3> 
 <script> 
document.querySelector('h2').innerHTML = 'Catch-22';
document.querySelector('h3').innerHTML = 'Joseph Heller'; 
 </script> 
</div> 
`;

const doc = new jsdom.JSDOM(html, { runScripts: "dangerously" })
const document = dom.window.document;
const window = doc.window

