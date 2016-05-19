var socket = io.connect('http://localhost:9000');
socket.on('measure:save', function (data) {
    //console.log(data);
    $(".sidebar").append("<p>" + JSON.stringify(data) + "</p>");
    $('#response-time span').text(data.took + ' ms');

    socket.emit('info', { my: data });
});