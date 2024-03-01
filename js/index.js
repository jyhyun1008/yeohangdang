//메타태그 설정
document.title = SITE_TITLE
var description = document.createElement('meta')
description.name = 'description'
description.content = SITE_DESCRIPTION
document.getElementsByTagName('head')[0].appendChild(description)
var themeColorApple = document.createElement('meta')
themeColorApple.name = 'apple-mobile-web-app-status-bar-style'
themeColorApple.content = ACCENT_COLOR
document.getElementsByTagName('head')[0].appendChild(themeColorApple)
var themeColor = document.createElement('meta')
themeColor.name = 'theme-color'
themeColor.content = ACCENT_COLOR
document.getElementsByTagName('head')[0].appendChild(themeColor)

//nav 관련 설정
var projectsHeight = document.querySelector('#projects-box').offsetHeight;
document.querySelector('#projects-box').style.top = 'calc( 50vh - '+projectsHeight+'px )';
var tocHeight = document.querySelector('#toc-box').offsetHeight;
document.querySelector('#toc-box').style.top = 'calc( 50vh - '+tocHeight+'px )';