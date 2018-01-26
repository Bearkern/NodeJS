var people = {
    "rules": {
        "people": {
            "indexOn": "mail"
        }
    },
    "David": {
        "age": 31,
        "height": 150,
        "weight": 55,
        "mail": 'aa@gmail.com'
    },
    "Casper": {
        "age": 32,
        "height": 175,
        "weight": 60,
        "mail": 'bb@gmail.com'
    },
    "Mary": {
        "age": 25,
        "height": 160,
        "weight": 50,
        "mail": 'mary@gmail.com'
    },
    "John": {
        "age": 33,
        "height": 173,
        "weight": 65,
        "mail": 'john@gmail.com'
    },
    "Mike": {
        "age": 28,
        "height": 180,
        "weight": 70,
        "mail": 'cc@gmail.com'
    }
}

firebase.database().ref('people').set(people);
var peopleRef = firebase.database().ref('people');
peopleRef.orderByChild('height').startAt(160).limitToFirst(1).once('value', function(snapshot) {
    snapshot.forEach(function(item) {
        console.log(item.key);
        console.log(item.val());
    })
});

var now = new Date();
console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());
console.log(now.getMilliseconds());






var item = document.getElementById('item');
var send = document.getElementById('send');
var list = document.getElementById('list');
var todos = firebase.database().ref('todos');

// 按送出，將資料存至 firebase database
send.addEventListener('click', function(e) {
    todos.push({ content: item.value });
    item.value = '';
})

// 在 list 顯示 database 裡的資料
todos.on('value', function(snapshot) {
    var data = snapshot.val();
    var str = '';
    for(var item in data) {
        str += '<li data-key=' + item + '>' + data[item].content + '</li>';
    }
    list.innerHTML = str;
});

// 當點擊待辦事項，刪除該筆資料
list.addEventListener('click', function(e) {
   if(e.target.nodeName == "LI") {
       var key = e.target.dataset.key;
       todos.child(key).remove();
   }
});

// "start": "node server.js"