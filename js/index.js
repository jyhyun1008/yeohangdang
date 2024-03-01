var projectsHeight, tocHeight



//윈도우 사이즈
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;

// 리사이즈
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    if (vw > 11) {
        document.querySelector('#projects-box').style.top = 'calc( 50vh - '+projectsHeight+'px )';
    } else {
        document.querySelector('#projects-box').style.top = 'auto';
    }

})

// 소리
function hoverPlay() {
    var hover = document.getElementById('hover_play')
    hover.pause();
    hover.currentTime = 0;
    hover.play()
    .then(() => {})
    .catch(error => {
        document.querySelector('#firstPage').style.display = 'block';
        document.querySelector('#wrapper').style.display = 'none';
        document.querySelector('#firstPage').addEventListener("click", (e) => {
            document.querySelector('#firstPage').style.display = 'none';
            document.querySelector('#wrapper').style.display = 'block';
        
        })
    });
}

//색 설정
document.documentElement.style.setProperty('--accent', `${ACCENT_COLOR}`);
document.documentElement.style.setProperty('--bg', `${BG_COLOR}`);

//메타태그 설정
document.title = SITE_TITLE
var description = document.createElement('meta')
description.name = 'description'
description.content = SITE_DESCRIPTION
document.getElementsByTagName('head')[0].appendChild(description)
var themeColorApple = document.createElement('meta')
themeColorApple.name = 'apple-mobile-web-app-status-bar-style'
themeColorApple.content = BG_COLOR
document.getElementsByTagName('head')[0].appendChild(themeColorApple)
var themeColor = document.createElement('meta')
themeColor.name = 'theme-color'
themeColor.content = BG_COLOR
document.getElementsByTagName('head')[0].appendChild(themeColor)

function getToc() {
    var toc = document.getElementsByClassName('h1')
    if (toc.length > 0) {
        for (var i = 0; i < toc.length; i++){
        toc[i].id = 'title'+i;
        toc[i].setAttribute("name", 'title'+i);
        var tocInnerText = toc[i].innerText;
        document.querySelector('#toc').innerHTML += '<div><a href="#title'+i+'">'+tocInnerText+'</a></div>';
        }
    }

    //nav 관련 설정
    projectsHeight = document.querySelector('#projects-box').offsetHeight;
    if (vw > 11) {
        document.querySelector('#projects-box').style.top = 'calc( 50vh - '+projectsHeight+'px )';
    }
    tocHeight = document.querySelector('#toc-box').offsetHeight;
    document.querySelector('#toc-box').style.top = 'calc( 50vh - '+tocHeight+'px )';

    hoverPlay();

    $("a").mouseover(function() {
        hoverPlay();
    });

}

//마크다운 파싱
function parseMd(md){

    md = "\n"+md
    var md0 = md;
  
    //ul
    md = md.replace(/^\s*\n\*\s/gm, '<ul>\n* ');
    md = md.replace(/^(\*\s.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*\s(.+)/gm, '<li class="before">$1</li>');
    
    //ul
    md = md.replace(/^\s*\n\-\s/gm, '<ul>\n* ');
    md = md.replace(/^(\-\s.+)\s*\n([^\-])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\-\s(.+)/gm, '<li class="before">$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\.\s/gm, '<ol>\n1. ');
    md = md.replace(/^(\d\.\s.+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.\s(.+)/gm, '<li>$1</li>');
    
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
    md = md.replace('</blockquote><blockquote>', '');
    md = md.replace('</blockquote>\n<blockquote>', '\n');

    //hr
    md = md.replace(/[\-]{3}/g, '</div></div><div class="item_wrap"><div class="line">✿--✿--✿</div><div class="item">');
    
    //h
    md = md.replace(/\n[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/\n[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/\n[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/\n[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/\n[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/\n[\#]{1}(.+)/g, '</div></div><div class="item_wrap"><div class="item"><h1 class="h1">$1</h1>');
    
    //images with links
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<div class="gallery"><a href="$3"><img src="$2" alt="$1" width="100%" /></a></div>');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" width="100%" />');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    
    //font styles
    md = md.replace(/[\*]{2}([^\*]+)[\*]{2}/g, '<strong>$1</strong>');
    md = md.replace(/[\*]{1}([^\*]+)[\*]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

    //주석
    md = md.replace(/\n[\/]{2}(.+)/g, '');
    
    //pre
    
    var mdpos = [];
    var rawpos = [];
    let pos1 = -1;
    let k = 0;

    var diff = [0]

    while( (pos1 = md0.indexOf('\n```', pos1 + 1)) != -1 ) { 
        if (k % 2 == 0){
            rawpos[k] = pos1 + 4;
        } else {
            rawpos[k] = pos1;
        }
        k++;
    }

    let pos2 = -1;
    let l = 0;

    while( (pos2 = md.indexOf('\n```', pos2 + 1)) != -1 ) { 
        if (l % 2 == 0){
            mdpos[l] = pos2 - 1;
        } else {
            mdpos[l] = pos2 + 5;
        }
        l++;
    }


    for (var i = 0; i < mdpos.length; i++){
        if (i % 2 == 0){
            md = md.replace(md.substring(mdpos[i] - diff[i], mdpos[i+1] - diff[i]), '<pre class="code">'+md0.substring(rawpos[i], rawpos[i+1])+'</pre>');
            var mdSubStringLength = mdpos[i+1] - mdpos[i];
            var rawSubStringLength = rawpos[i+1] - rawpos[i] + '<pre class="code">'.length + '</pre>'.length;
            diff[i+2] = diff[i] + mdSubStringLength - rawSubStringLength;
        }
    }

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

    //br
    md = md.replace(/\n\n/g, '</p><p>');
    
    return md;
}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject();
var page = qs.p;
var directory = qs.d;

if (!page && !directory) {
    var url = "https://raw.githubusercontent.com/"+USERNAME+"/"+REPOSITORY+"/main/page/index.md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".page_title").innerText = 'index'
        document.querySelector(".page_content").innerHTML += parseMd(out)
        getToc();
        
    })
    .catch(err => { throw err });
} else if (page) {
    var url = "https://raw.githubusercontent.com/"+USERNAME+"/"+REPOSITORY+"/main/page/"+page+".md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".page_title").innerText = page.substring(page.lastIndexOf('/') + 1)
        document.querySelector(".page_content").innerHTML += parseMd(out)
        
        getToc();
    })
    .catch(err => { throw err });
} else if (directory) {
    var url = "https://api.github.com/repos/"+USERNAME+"/"+REPOSITORY+"/git/trees/main"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        var resulturl = JSON.parse(out).tree[2].url
    })
}