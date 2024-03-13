var projectsHeight, tocHeight
var hover = document.getElementById('hover_play')

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
    hover.pause();
    hover.currentTime = 0;
    hover.play()
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
    
    hover.pause();
    hover.currentTime = 0;
    if (vw > 12) {
        $("a").mouseover(function() {
            hoverPlay();
        });
    }

}

function getCat(directory, arr) {
    document.querySelector('#toc').innerHTML = '<div><a href="./?d='+directory+'">ALL</a></div>';
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++){
            document.querySelector('#toc').innerHTML += '<div><a href="./?d='+directory+'/'+arr[i]+'">'+arr[i]+'</a></div>';
        }
    }

    //nav 관련 설정
    projectsHeight = document.querySelector('#projects-box').offsetHeight;
    if (vw > 11) {
        document.querySelector('#projects-box').style.top = 'calc( 50vh - '+projectsHeight+'px )';
    }
    tocHeight = document.querySelector('#toc-box').offsetHeight;
    document.querySelector('#toc-box').style.top = 'calc( 50vh - '+tocHeight+'px )';
    
    hover.pause();
    hover.currentTime = 0;
    if (vw > 12) {
        $("a").mouseover(function() {
            hoverPlay();
        });
    }

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

    hover.pause();
    hover.currentTime = 0;
    if (vw > 12) {
        hover.play()
        .then(() => {
            hover.pause();
            hover.currentTime = 0;
            location.href = './?p=index'
        })
        .catch(error => {
            document.querySelector('#firstPage').style.display = 'flex';
            document.querySelector('#wrapper').style.display = 'none';
            document.querySelector('#firstPage').addEventListener("click", (e) => {
                location.href = './?p=index'
            })
        })

        $("a").mouseover(function() {
            hoverPlay();
        });
    } else {
        location.href = './?p=index'
    } 


} else if (page == 'gallery') {
    document.querySelector(".page_title").innerText = page
    document.querySelector(".page_content").innerHTML += '<div class="gallery_list"></div>'

    var findImgUrl = "https://i.peacht.art/api/users/notes"
    var findImgParam = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userId: '9pst070wee',
            withFiles: true,
            limit: 100
        })
    }
    fetch(findImgUrl, findImgParam)
    .then((imgData => {return imgData.json()}))
    .then((imgRes) => {
        var imgs = []
        var notes = []

        if (imgRes.length != 0) {
            for (var i = 0; i<imgRes.length; i++) {
                for (var j = 0; j < imgRes[i].files.length; j++) {
                    imgs.push(imgRes[i].files[j].url)
                    notes.push('https://i.peacht.art/notes/'+imgRes[i].id)
                }
            }
            for (var i = 0; i < imgs.length; i++) {
                document.querySelector(".gallery_list").innerHTML += '<div class="gallery"><a href="'+notes[i]+'" target="_blank"><img src="'+imgs[i]+'"></a></div>'
                
            }
            for (var i=0; i < (imgs.length - 1) % 3; i++) {
                document.querySelector(".gallery_list").innerHTML += '<div class="gallery"></div>'
            }
        }
        getToc();
    })
} else if (page) {
    var url = "https://raw.githubusercontent.com/"+USERNAME+"/"+REPOSITORY+"/main/page/"+page+".md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        var page_title = page.substring(page.lastIndexOf('/') + 1)
        if (page_title.split('_').length == 3) {
            var this_directory = page.split('/')[0]
            var this_category = page_title.split('_')[0]
            var this_date = page_title.split('_')[1]
            var this_title = page_title.split('_')[2]
            document.querySelector(".page_title").innerText = this_title
            document.querySelector(".page_content").innerHTML += '<div class="page_subtitle"><div><a href="./?d='+this_directory+'">'+this_directory+'</a>/<a href="./?d='+this_directory+'/'+this_category+'">'+this_category+'</a></div><div><code>'+this_date+'</code></div></div>'
        } else {
            document.querySelector(".page_title").innerText = page_title
        }
        document.querySelector(".page_content").innerHTML += parseMd(out)
        
        getToc();
    })
    .catch(err => { throw err });
} else if (directory.split('/')[0]=='blog') {
    document.querySelector(".page_title").innerText = 'blog'
    document.querySelector(".page_content").innerHTML += '<div class="article_list"></div>'
    var url = 'https://i.peacht.art/socket.io'
    fetch(url)
    .then(res => {return res.json()})
    .then((out) => {
        var result = out.data
        var articles = []
        var categories = []
        for (var i=0; i<result.length; i++) {
            articles.push({
                title: result[i].attributes.title,
                category: result[i].relationships.user_defined_tags.data[0].id.split(';')[1],
                date: result[i].attributes.created_at.substring(2, 4)+result[i].attributes.created_at.substring(5, 7)+result[i].attributes.created_at.substring(8, 10),
                url: result[i].attributes.url,
            })
            categories.push(result[i].relationships.user_defined_tags.data[0].id.split(';')[1])
        }

        var categorieset = new Set(categories);
        categories = [...categorieset];
        var category

        if (directory.split('/').length == 1) {
            category = ''
        } else {
            category = directory.split('/')[1]
        }

        for (var j=0; j<articles.length; j++){
            if (articles[j].category == category || category == ''){
                document.querySelector(".article_list").innerHTML += '<div class="article"><a href="'+articles[j].url+'" target="_blank"><span>'+articles[j].title+'</span><span><code>'+articles[j].category+'</code> <code>'+articles[j].date+'</code></span></a></div>'
            }
        }

        getCat(directory.split('/')[0], categories);

    })
} else if (directory.split('/')[0]=='blog2') {
	document.querySelector(".page_title").innerText = 'blog'
    document.querySelector(".page_content").innerHTML += '<div class="article_list"></div>'
    var url = 'https://i.peacht.art/fanbox'
    fetch(url)
    .then(res => {return res.json()})
    .then((out) => {
        var result = out.body.items
        var articles = []
        var categories = []
        for (var i; i<result.length; i++) {
            articles.push({
                title: result[i].title,
                category: result[i].tags[0],
                date: result[i].publishedDatetime.substring(2, 4)+result[i].publishedDatetime.substring(5, 7)+result[i].publishedDatetime.substring(8, 10),
                url: "https://yeohangdang.fanbox.cc/posts/"+result[i].id,
            })
            categories.push(result[i].tags[0])
        }

        var categorieset = new Set(categories);
        categories = [...categorieset];
        var category

        if (directory.split('/').length == 1) {
            category = ''
        } else {
            category = directory.split('/')[1]
        }

        for (var j=0; j<articles.length; j++){
            if (articles[j].category == category || category == ''){
                document.querySelector(".article_list").innerHTML += '<div class="article"><a href="'+articles[j].url+'" target="_blank"><span>'+articles[j].title+'</span><span><code>'+articles[j].category+'</code> <code>'+articles[j].date+'</code></span></a></div>'
            }
        }

        getCat(directory.split('/')[0], categories);
    })
} else if (directory) {
    document.querySelector(".page_title").innerText = directory
    document.querySelector(".page_content").innerHTML += '<div class="article_list"></div>'
    var url = "https://api.github.com/repos/"+USERNAME+"/"+REPOSITORY+"/git/trees/main"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        var resultree1 = JSON.parse(out).tree;
        for (var k=0; k < resultree1.length; k++) {
            if (resultree1[k].path == 'page') {
                var resulturl1 = resultree1[k].url
                fetch(resulturl1)
                .then(res2 => res2.text())
                .then((out2) => {
                    var resultree2 = JSON.parse(out2).tree;
                    for (var i=0; i < resultree2.length; i++) {
                        if (resultree2[i].path == directory.split('/')[0]) {
                            var resulturl2 = resultree2[i].url
                            fetch(resulturl2)
                            .then(res3 => res3.text())
                            .then((out3) => {
                                var result = JSON.parse(out3).tree
                                result.sort((a, b) => parseInt(b.path.split('_')[1]) - parseInt(a.path.split('_')[1]));
                                var articles = []
                                var categories = []
                                for (var j=0; j<result.length;j++) {
                                    articles.push({
                                        title: result[j].path.split('_')[2].split('.')[0],
                                        category: result[j].path.split('_')[0],
                                        date: result[j].path.split('_')[1]
                                    })
                                    categories.push(result[j].path.split('_')[0])
                                }

                                var categorieset = new Set(categories);
                                categories = [...categorieset];
                                var category

                                if (directory.split('/').length == 1) {
                                    category = ''
                                } else {
                                    category = directory.split('/')[1]
                                }

                                for (var j=0; j<articles.length; j++){
                                    if (articles[j].category == category || category == ''){
                                        document.querySelector(".article_list").innerHTML += '<div class="article"><a href="./?p='+directory.split('/')[0]+'/'+articles[j].category+'_'+articles[j].date+'_'+articles[j].title+'"><span>'+articles[j].title+'</span><span><code>'+articles[j].category+'</code> <code>'+articles[j].date+'</code></span></a></div>'
                                    }
                                }

                                getCat(directory.split('/')[0], categories);
                            })
                        }
                    }
                })
            }
        }
    })
}