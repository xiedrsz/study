// 语音听写
navigator.xfySpeech.recognize(function (data) {
    console.log(data);
}, function (err) {
    console.log("Erro: " + err);
});