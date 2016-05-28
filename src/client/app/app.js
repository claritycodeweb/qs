var socket = io.connect('http://localhost:9000');
socket.on('measure:save', function (data) {
    //console.log(data);
    $(".sidebar").append("<p>" + JSON.stringify(data) + "</p>");

    var eTime = $('#res-response-time span');
    var eStatus = $('#res-status-code span');
    if (data.isError) {
        eStatus.text("#ERR");
        eTime.text('#ERR: ' + data.message);
    } else {
        eStatus.text(data.statusCode + ' (' + data.message + ')');
        eTime.text(data.took + ' ms');
    }

    socket.emit('info', { client: data });
});