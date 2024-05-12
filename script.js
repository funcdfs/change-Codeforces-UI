// ==UserScript==
// @name         change-Codeforces-UI
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  CHANGE CODEFORCES UGLY UI TO ANOTHER UGLY UI BY FUNCDFS
// @author       funcdfs
// @match        https://atcoder.jp/contests/*
// @match        https://codeforces.com/*/problem/*
// @match        https://codeforces.com/contest/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/470204/change-Codeforces-UI.user.js
// @updateURL https://update.greasyfork.org/scripts/470204/change-Codeforces-UI.meta.js
// ==/UserScript==

(function () {
    'use strict';
    // atcoder 添加本次其他题目
    const KEY_PREFIX = 'atcoder-problem-navigator-';
    const do_atcoder = () => {
        const contest = location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/?]+)/)[1];
        const key = KEY_PREFIX + 'atcoder-' + contest;
        if (location.href.match(/^https:\/\/atcoder\.jp\/contests\/([^\/]+)\/tasks\/?$/)) {
            const problems = [];
            const rows = document.querySelectorAll('tbody>tr');
            for (let i = 0; i < rows.length; i++) {
                const links = rows[i].querySelectorAll('a');
                const href = links[0].getAttribute('href');
                const text = links[0].textContent + ' - ' + links[1].textContent;
                problems.push({
                    href: href,
                    text: text
                });
            }
            localStorage[key] = JSON.stringify(problems);
        }
        if (key in localStorage) {
            let problems = JSON.parse(localStorage[key]);
            const problemsBar = document.createElement('ul');
            problemsBar.className = 'nav nav-tabs';
            for (let i = 0; i < problems.length; i++) {
                const link = document.createElement('a');
                link.setAttribute('style', 'margin-left: 10px; margin-right: 10px; white-space: nowrap');
                link.setAttribute('href', problems[i].href);
                link.textContent = problems[i].text;
                const span = document.createElement('span');
                span.textContent = ' ';
                span.appendChild(link);
                problemsBar.appendChild(span);
            }
            document.getElementById('contest-nav-tabs').appendChild(problemsBar);
        }
    };
    const do_codeforces = () => {
        // 添加本次比赛的其他题目
        const contest = location.href.match(/^https:\/\/codeforces\.com\/contest\/([^\/?]+)/)[1];
        const key = KEY_PREFIX + 'codeforces-' + contest;
        if (location.href.match(/^https:\/\/codeforces\.com\/contest\/([^\/]+)\/?$/)) {
            const problems = [];
            const rows = document.querySelectorAll('.problems>tbody>tr');
            // Starts from 1 to skip the header
            for (let i = 1; i < rows.length; i++) {
                const links = rows[i].querySelectorAll('a');
                const href = links[0].getAttribute('href');
                const text = links[0].textContent.trim() + '. ' + links[1].textContent;
                problems.push({
                    href: href,
                    text: text
                });
            }
            localStorage[key] = JSON.stringify(problems);
        }
        if (key in localStorage) {
            let problems = JSON.parse(localStorage[key]);
            const problemsBar = document.createElement('ul');
            problemsBar.classList.add('problemsBar')
            problemsBar.setAttribute('style', 'margin-left: 15px; margin-right: 280px;');
            for (let i = 0; i < problems.length; i++) {
                const link = document.createElement('a');
                link.setAttribute('style', 'margin-right: 20px; margin-bottom: 20px !important; color: green !important; white-space: nowrap');
                link.setAttribute('href', problems[i].href);
                link.textContent = problems[i].text;
                const span = document.createElement('span');
                span.textContent = ' ';
                span.appendChild(link);
                problemsBar.appendChild(span);
            }
            const content = document.querySelector("#sidebar > div.roundbox.sidebox.ContestVirtualFrame.borderTopRound > div:nth-child(2) > div:nth-child(1)")
            content.parentNode.insertBefore(problemsBar, content);
            content.setAttribute('style', 'display: none !important');
        }
        // 自定义css
        const styleTag = document.createElement('style');
        const cssRules = `
body {
    background-color: #e7e9ed0f;
}

.roundbox {
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #e7e9ed0f;
}

.personal-sidebar .nav-links li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.personal-sidebar .nav-links li a {
    text-decoration: none !important;
}

.roundbox .bottom-links {
    padding: 10px;
    background-color: #e7e9ed0f;
    background-color: #e7e9ed0f;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
}

.roundbox .rtable .dark {
    background-color: #e7e9ed0f;
}

/** Topic custom */
.topic {
    margin-top: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.topic:hover {
    -webkit-box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
}

.topic .roundbox {
    border-style: solid;
    border-color: #e4e6eb;
}

.topic .meta a {
    text-decoration: none;
}

.meta {
    padding-bottom: 0px !important;
}

.topic .content {
    border-left-color: #e4e6eb;
}

.roundbox .rtable td,
.roundbox .rtable th {
    border-bottom: 1px solid #e4e6eb;
    border-left: none;
    padding: 7px;
}

/** Header remove to bottom */
.time-limit {
    width: 100%;
    /* 设置元素宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 溢出内容隐藏 */
    text-align: center;
    /* 水平居中 */
}

.memory-limit {
    width: 100%;
    /* 设置元素宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 溢出内容隐藏 */
    text-align: center;
    /* 水平居中 */
}

.input-file {
    width: 100%;
    /* 设置元素宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 溢出内容隐藏 */
    text-align: center;
    /* 水平居中 */

}

.output-file {
    width: 100%;
    /* 设置元素宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 溢出内容隐藏 */
    text-align: center;
    /* 水平居中 */
}

#header {
    position: fixed !important;
    top: 15px;
    z-index: 100;
    right: 15px;
    /* 将元素右对齐 */
    width: 220px;
}
.property-title,
#header > div:nth-child(1) {
    display: none !important;
}

/** Footer custom */
#footer {
    /** background-color: #fff;
    width: 100%;
    height: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-top-color: #e4e6eb;
    **/
    display: none !important;
}

/** Contest data table */
.datatable .lt,
.datatable .rt,
.datatable .lb,
.datatable .rb,
.datatable .ilt,
.datatable .irt {
    display: none;
}

.datatable table {
    margin-top: 10px;
    border-style: solid;
    border-color: #e4e6eb;
    border-width: 1px;
}

.datatable table .dark {
    background-color: #fff;
}

.datatable table td {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
}

.datatable {
    padding: 20px !important;
    width: inherit;
    padding-bottom: 40px !important;
    background-color: #fff !important;
    border-radius: 10px;
    -webkit-transition: all 0.3s linear 0s;
    -moz-transition: all 0.3s linear 0s;
    -ms-transition: all 0.3s linear 0s;
    -o-transition: all 0.3s linear 0s;
    transition: all 0.3s linear 0s;
}

.datatable:hover {
    -webkit-box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.1);
}

.contests-table::first-line {
    font-weight: bold !important;
}


.datatable {
    margin-top: 10px !important;
}

.sample-test {
    margin-top: 10px;
}

.sample-test pre {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
}

.placeholder {
    margin-bottom: 10px !important;
}

a[href^="/passwordRecovery"] {
    display: block;
    margin-top: 20px !important;
}

.backLava {
    border-radius: 10px;
}

::selection {
    background-color: #c4b5fd !important;
    color: #000 !important;
}

::-webkit-scrollbar-thumb {
    background: #323536 !important;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

div.ttypography a:hover {
    color: #9e88f5 !important;
    background: #cfecdc;
}

pre {
    tab-size: 4;
}

.sidebar-menu ul {
    font-size: 1.5rem;
}
`;
        styleTag.appendChild(document.createTextNode(cssRules));
        document.head.appendChild(styleTag);

        // friends-status-button 好友提交历史记录
        let uuuuuuuuurl = window.location;
        let contestId = uuuuuuuuurl.toString().split("/").filter((x) => {
            if (typeof x !== 'string') { return; }
            const num = Number(x);
            if (Number.isInteger(num)) { return num; }
        })[0];
        let s = uuuuuuuuurl.toString().split("/");
        let id = s[s.length - 1];
        let friendBtn = document.createElement('li');
        friendBtn.innerHTML = `<a href="https://codeforces.com/contest/${contestId}/status/${id}?friends=on" target="_blank">Friends Status</a>`;
        friendBtn.classList.add('friendBtn')
        document.querySelector(".second-level-menu-list").appendChild(friendBtn);

        // time limits part 时间限制等，移到右边
        const timeLimits = document.querySelector(".time-limit");
        const memoryLimits = document.querySelector(".memory-limit");
        const inputLimits = document.querySelector(".input-file");
        const outputLimits = document.querySelector(".output-file");
        let informationSpace = document.querySelector("#sidebar > div:nth-child(12)")
        if (informationSpace === null) {
            informationSpace = document.querySelector("#sidebar > div:nth-child(11)")
        }
        informationSpace.appendChild(timeLimits);
        informationSpace.appendChild(memoryLimits);
        informationSpace.appendChild(inputLimits);
        informationSpace.appendChild(outputLimits);
        // change div location 改变侧边栏优先级
        let contestPart = document.querySelector("#sidebar > div.roundbox.sidebox.sidebar-menu.borderTopRound")
        let divPart = document.querySelector("#sidebar > div:nth-child(1)");
        let kelong = document.querySelector("#sidebar > div.roundbox.sidebox.ContestCloneSidebarFrame.borderTopRound")
        let xuni = document.querySelector("#sidebar > div.roundbox.sidebox.ContestVirtualFrame.borderTopRound")
        contestPart.appendChild(divPart);
        contestPart.appendChild(kelong);
        contestPart.appendChild(xuni);
        let xunibiaoti = document.querySelector("#sidebar > div.roundbox.sidebox.sidebar-menu.borderTopRound > div.roundbox.sidebox.ContestVirtualFrame.borderTopRound > div.caption.titled");
        xuni.setAttribute('style', 'border: 0px; margin-bottom: -20px'); // 虚拟部分
        divPart.setAttribute('style', 'border: 0px; margin-top: 30px;'); // div 几 部分
        kelong.setAttribute('style', 'border: 0px; margin-bottom: -10px'); // 克隆部分
        let kaishixuni = document.querySelector("#sidebar > div.roundbox.sidebox.sidebar-menu.borderTopRound > div.roundbox.sidebox.ContestVirtualFrame.borderTopRound > div:nth-child(2) > div:nth-child(3)")
        contestPart.appendChild(xunibiaoti);
        contestPart.appendChild(kaishixuni);
        // 收藏按钮 删掉
        let shouchang = document.querySelector("#sidebar > div.roundbox.sidebox.sidebar-menu.borderTopRound > div:nth-child(3) > table > tbody > tr:nth-child(4)")
        shouchang.setAttribute('style', 'display: none');
        // jump to luogu.com 跳转到洛谷
        let str = window.location.href
        let luogufather = document.querySelector("#sidebar > div.roundbox.sidebox.sidebar-menu.borderTopRound > ul")
        let luogulink = document.createElement('li');
        luogulink.setAttribute('style', 'color: green !important;');
        luogufather.appendChild(luogulink);
        let problemId = getProblemId(str);
        let problemChar = getProblemChar(str);
        luogulink.innerHTML = `<a href="https://www.luogu.com.cn/problem/CF${problemId}${problemChar} target="_blank"> 洛谷 镜像</a>`;
        luogufather.addEventListener('click', () => {
            location.assign();
        })
        // 适配北极小狐的按钮样式 TODO
        // inputBtn.classList.add('ojb_btn')
    };

    function getProblemId(str) {
        let pos = str.indexOf("contest/") + "contest/".length;
        let contestNum = "";
        while (str[pos] >= '0' && str[pos] <= '9') {
            contestNum += str[pos];
            pos++;
        }
        return contestNum;
    }

    function getProblemChar(str) {
        let pos = str.indexOf("problem/") + "problem/".length;
        let problemLetter = str.substr(pos);
        return problemLetter;
    }
    if (location.href.match(/^https:\/\/atcoder\.jp\/contests\//)) {
        do_atcoder();
    } else {
        do_codeforces();
    }
})();
