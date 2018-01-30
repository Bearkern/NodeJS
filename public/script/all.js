var content = document.getElementById('content');
var save = document.getElementById('save');
var list = document.getElementById('list');
var deleteItem = document.getElementById('delete');

save.addEventListener('click', function(e) {
    var item = content.value;
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/addTodo');
    xhr.setRequestHeader('Content-type', 'application/json');
    var todo = JSON.stringify({ "content": item });
    xhr.send(todo);
    xhr.onload = function() {
        var originData = JSON.parse(xhr.responseText);
        console.log(originData);
        if(originData.success == false){
            alert(originData.message);
            return;
        }
        var data = originData.result;
        var str = '';
        for(item in data) {
            str += '<li>' + data[item].content + '<input type="button" data-id="' + item + '" value="Delete"></li>';
        }
        list.innerHTML = str;
    }
});

list.addEventListener('click', function(e) {
    if (e.target.nodeName !== "INPUT") {
        return;
    }
    var id = e.target.dataset.id;
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/removeTodo');
    xhr.setRequestHeader('Content-type', 'application/json');
    var removeTodo = JSON.stringify({ "id": id });
    xhr.send(removeTodo);
    xhr.onload = function() {
        var originData = JSON.parse(xhr.responseText);
        var data = originData.result;
        console.log(data);
        var str = '';
        for(item in data) {
            str += '<li>' + data[item].content + '<input data-id="' + item + '" type="button" value="Delete"></li>'
        };

        list.innerHTML = str;
    };
})