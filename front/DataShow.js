function creatOptions(arr) {
    let len = arr.length;
    let optionsLength = document.getElementById("optionsLength");
    optionsLength.innerHTML = len;
    let selectOptions = new Array();
    for (let i = 1; i < len + 1; i++) {
        selectOptions[i] = "第" + i + "个数据包"
    }
    let select = document.getElementById("packSelect");
    for (index in selectOptions) {
        select.options[select.options.length] = new Option(selectOptions[index], index);
    }
}

function flagHandle(flagCode) {//标识码对应转换
    let flag="";
    switch (flagCode) {
        case 2:
            flag = "SYN";
            break;
        case 12:
            flag = "SYN,ACK";
            break;
        case 10:
            flag = "ACK";
            break;
        case 18:
            flag="PSH,ACK";
            break;
        case 14:
            flag="RST,ACK";
            break;
        case 11:
            flag="FIN,ACK";
            break;
    }
    return flag;
}

function dataShow(index) {
    let trueIndex = index - 1;
    let dstmac = document.getElementById("DstMac"),
        srcmac = document.getElementById("SrcMac"),
        dstip = document.getElementById("DstIp"),
        srcip = document.getElementById("SrcIp"),
        ipv = document.getElementById("Ipv"),
        dstport = document.getElementById("DstPort"),
        srcport = document.getElementById("SrcPort"),
        protocol = document.getElementById("Protocol"),
        data = document.getElementById("Data"),
        flags = document.getElementById("Flag");
    let info = window.info;
    dstmac.innerHTML = info[trueIndex].DstMac;
    srcmac.innerHTML = info[trueIndex].SrcMac;
    dstip.innerHTML = info[trueIndex].DstIp;
    srcip.innerHTML = info[trueIndex].SrcIp;
    ipv.innerHTML = info[trueIndex].Ipv;
    dstport.innerHTML = info[trueIndex].DstPort;
    srcport.innerHTML = info[trueIndex].SrcPort;
    data.innerHTML = info[trueIndex].Data;
    protocol.innerHTML = info[trueIndex].Protocol;
    flags.innerHTML=flagHandle(info[trueIndex].Flags);
}