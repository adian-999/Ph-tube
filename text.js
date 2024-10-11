function getTimeString(time){
    const day = parseInt(time / 86400);
    let remainingSec= time% 86400;
    const hour = parseInt(remainingSec/3600);
     remainingSec=time%3600;
    const min = parseInt(remainingSec/60);
     const sec = remainingSec%60;


    return `${day} day ${hour} hour ${min} minute ${sec} second ago`

}
console.log(getTimeString(86407688));