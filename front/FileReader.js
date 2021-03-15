let droptarget = document.getElementById("dropTarget");
let dataPack = {
    DstMac: "",
    SrcMac: "",
    IpType: "ipv4",
    Ipv: "4",
    IpHeaderlen: "20",
    DSF: "0",
    TotalLen: "52",
    Id: "0",
    FragFlags: "Don't fragment", //是否分组
    Offset: "0", //分组偏移量
    LiveTime: "0",
    Protocol: "TCP",
    HeaderCheck: "0", //头部校验和
    SrcIp: "192.168.0.1",
    DstIp: "192.168.0.2",
    SrcPort: "8888",
    DstPort: "6666",
    SeqNum: "0", //序列号
    AckNum: "1", //确认号
    TcpHeaderLen: "32",
    Flags: "111",
    WindowSize: "7777",
    CheckSum: "1111",
    UrgentPointer: "0",
    Data: "default"
};

function consoleObj(obj) { //打印对象所有属性及值的方法
    let str = "";
    for (const item in obj) {
        str += item + ":" + obj[item] + "\n";
    }
    return str;
}

function handleInfo(info) { //处理文件内容，分割成独立的数据包，返回每个包的具体内容
    let arrayOfStrings = info.split("\r\n");
    let tcpArray = new Array();
    for (let i = 0; i < arrayOfStrings.length; i++) {
        if (arrayOfStrings[i].length > 50) { //去除时间以及报头数据
            tcpArray.push(arrayOfStrings[i]);
        }
    }
    // for (const v of tcpArray) {
    //     console.log(v);
    // }
    var packArray = new Array(); //包含每个数据包对象的数组
    for (let i = 0; i < tcpArray.length; i++) {
        packArray[i] = JSON.parse(JSON.stringify(handleDataPack(tcpArray[i])));
    }
    return packArray;
}

function handleDataPack(arr) { //解析每个数据包的具体内容
    let temp = arr.slice(2);
    arrayOfInfo = temp.split("|");
    let tempDstMac = "";
    let tempSrcMac = "";
    for (let i = 1; i < 7; i++) {
        if (i < 6) {
            tempDstMac += arrayOfInfo[i] + ":";
        } else {
            tempDstMac += arrayOfInfo[i];
        }
    }
    dataPack.DstMac = tempDstMac;
    for (let i = 7; i < 13; i++) {
        if (i < 12) {
            tempSrcMac += arrayOfInfo[i] + ":";
        } else {
            tempSrcMac += arrayOfInfo[i];
        }
    }
    dataPack.SrcMac = tempSrcMac;
    let IntType = arrayOfInfo[13] + arrayOfInfo[14]; //网络层协议
    switch (IntType) {
        case "0800":
            dataPack.IpType = "ipv4";
            break;
        case "0806":
            dataPack.IpType = "arp";
            break;
        case "86DD":
            dataPack.IpType = "ipv6";
            break;
    }
    dataPack.Ipv = arrayOfInfo[15].charAt(0);
    dataPack.IpHeaderLen = arrayOfInfo[15].charAt(1);
    dataPack.DSF = arrayOfInfo[16];
    let totalLen = arrayOfInfo[17] + arrayOfInfo[18];
    let DecTotalLen = parseInt(totalLen, 16);
    dataPack.totalLen = DecTotalLen;
    let id = arrayOfInfo[19] + arrayOfInfo[20];
    let DecId = parseInt(id, 16);
    dataPack.Id = DecId;
    dataPack.LiveTime = parseInt(arrayOfInfo[23], 16);
    let protocol = arrayOfInfo[24];
    if (protocol == "17") { //区分TCP与UDP
        dataPack.protocol = "UDP";
    }
    dataPack.HeaderCheck = arrayOfInfo[25] + arrayOfInfo[26];
    dataPack.SrcIp = parseInt(arrayOfInfo[27], 16) + "." + parseInt(arrayOfInfo[28], 16) + "." +
        parseInt(arrayOfInfo[29], 16) + "." + parseInt(arrayOfInfo[30], 16);
    dataPack.DstIp = parseInt(arrayOfInfo[31], 16) + "." + parseInt(arrayOfInfo[32], 16) + "." +
        parseInt(arrayOfInfo[33], 16) + "." + parseInt(arrayOfInfo[34], 16);
    dataPack.SrcPort = parseInt(arrayOfInfo[35] + arrayOfInfo[36], 16);
    dataPack.DstPort = parseInt(arrayOfInfo[37] + arrayOfInfo[38], 16);
    dataPack.SeqNum = arrayOfInfo[39] + arrayOfInfo[40] + arrayOfInfo[41] + arrayOfInfo[42];
    dataPack.AckNum = arrayOfInfo[43] + arrayOfInfo[44] + arrayOfInfo[45] + arrayOfInfo[46];
    dataPack.TcpHeaderLen = parseInt(arrayOfInfo[47].charAt(0), 16) * 4;
    let HexFlags = Number(arrayOfInfo[47].charAt(1) + arrayOfInfo[48]);
    dataPack.Flags = HexFlags;
    let windowSize = arrayOfInfo[49] + arrayOfInfo[50];
    dataPack.WindowSize = parseInt(windowSize, 16);
    dataPack.CheckSum = arrayOfInfo[51] + arrayOfInfo[52];
    dataPack.UrgentPointer = parseInt(arrayOfInfo[53] + arrayOfInfo[54], 16);
    let dataString = "";
    for (let i = 55; i < arrayOfInfo.length; i++) { //16进制编码转字符，先将16进制转化为10进制，再调用String.fromCharCode()方法转化为字符
        let dataInt = parseInt(arrayOfInfo[i], 16);
        let data;
        data = String.fromCharCode(dataInt);
        dataString += data;
    }
    dataPack.Data = dataString;
    return dataPack;
}

function handleEvent(event) {
    let info = "";
    // output = document.getElementById("output");
    let files;
    let filetype = "default";
    event.preventDefault();
    if (event.type == "drop") {
        files = event.dataTransfer.files;
        let reader = new FileReader();
        if (/image/.test(files[0].type)) {
            filetype = "image";
            info = filetype + "不是可处理的文件类型";
        } else {
            reader.readAsText(files[0]);
            // filetype = "txt";
        }
        reader.onerror = function () {
            info = "无法读取文件，错误代码:" + reader.error.code;
        }
        reader.onload = function () {
            info = reader.result;
            info = handleInfo(info);
            window.info = info;
            // output.innerHTML = info;
            // console.log(info);
            creatOptions(window.info); //根据数据包数量动态生成select的options
            dataShow(1); //用于刷新信息框
        }
    }
}
droptarget.addEventListener("dragenter", handleEvent);
droptarget.addEventListener("dragover", handleEvent);
droptarget.addEventListener("drop", handleEvent);