
function sepProcess(arr) { //用于分离握手和挥手过程的数据包,并更新页面信息
    let processArr = new Array();
    for (let i = 0; i < arr.length; i++) {
        if (processArr.length == 6) {
            break;
        }
        if (arr[i].Flags == 2 && arr[i + 1].Flags == 12 && arr[i + 2].Flags == 10) {
            processArr.push(arr[i], arr[i + 1], arr[i + 2]);
        }
        if (arr[i].Flags == 11 && arr[i + 1].Flags == 11 && arr[i + 2].Flags == 10) {
            processArr.push(arr[i], arr[i + 1], arr[i + 2]);
        }
    }
    let hi1 = document.getElementById("hi1"),
        hi2 = document.getElementById("hi2"),
        hi3 =document.getElementById("hi3"),
        bye1 =document.getElementById("bye1"),
        bye2 =document.getElementById("bye2"),
        bye3 =document.getElementById("bye3"),
        bye4 =document.getElementById("bye4");
    hi1.innerHTML="第一次握手  "+flagHandle(processArr[0].Flags)+"   "+processArr[0].SeqNum+"   "+processArr[0].AckNum;
    hi2.innerHTML="第二次握手  "+flagHandle(processArr[1].Flags)+"   "+processArr[1].SeqNum+"   "+processArr[1].AckNum;
    hi3.innerHTML="第三次握手  "+flagHandle(processArr[2].Flags)+"   "+processArr[2].SeqNum+"   "+processArr[2].AckNum;
    bye1.innerHTML="第一次挥手  "+flagHandle(processArr[3].Flags)+"   "+processArr[3].SeqNum+"   "+processArr[3].AckNum;
    bye2.innerHTML="第二次挥手  "+flagHandle(processArr[4].Flags)+"   "+processArr[4].SeqNum+"   "+processArr[4].AckNum;
    bye3.innerHTML="第三次挥手  "+flagHandle(processArr[4].Flags)+"   "+processArr[4].SeqNum+"   "+processArr[4].AckNum;
    bye4.innerHTML="第四次挥手  "+flagHandle(processArr[5].Flags)+"   "+processArr[5].SeqNum+"   "+processArr[5].AckNum;
}
    
const animationTimeLine = () => { //连接动画启动函数
    const tl = new TimelineMax();
    tl
        .to("#hi1", 1, {
            visibility: "visible"
        })
        .to("#path1", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path1", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        })
        .to("#hi2", 1, {
            visibility: "visible"
        })
        .to("#path2", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path2", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        })
        .to("#hi3", 1, {
            visibility: "visible"
        })
        .to("#path3", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path3", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        })
        .to("#bye1", 1, {
            visibility: "visible"
        })
        .to("#path4", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path4", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        }).to("#bye2", 1, {
            visibility: "visible"
        })
        .to("#path5", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path5", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        })
        .to("#bye3", 1, {
            visibility: "visible"
        })
        .to("#path6", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path6", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        }).to("#bye4", 1, {
            visibility: "visible"
        })
        .to("#path7", 0.1, {
            visibility: "visible"
        })
        .fromTo("#path7", 2, {
            drawSVG: "5%"
        }, {
            drawSVG: "100%"
        })
}