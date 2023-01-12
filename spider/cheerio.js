import { load } from 'cheerio'

// 用 cheerio 解析静态 html 文件
const html = `
<html> 
<body> 
 <div class="book"> 
    <h2>Catch-22</h2> 
    <h3>Joseph Heller</h3> 
    <p>A satirical indictment of military madness.</p> 
 </div> 
</body> 
</html>`;

const $ = load(html)

console.log($('div.book h3').text())