var Body = {
    setColor: function (color) {
        $('body').css('color',color);
        //document.querySelector('body').style.color = color;
        console.log("Called Body.setcolor!!");
    },
    setBackgroundColor: function (color) {
        $('body').css('backgroundColor', color);
        //document.querySelector('body').style.backgroundColor = color;
        console.log("Called Body.setBackgroundcolor!!");
    }
}
var Anchor = {
    setColor: function (color) {
    //     var lists = document.querySelectorAll('a');
    //     for (var i = 0; i < lists.length; i++) {
    //         lists[i].style.color = color;
    //     }
    //     console.log("Called Anchor.setColor!!")
        $('a').css('color',color);
    }
}
function setAnchorColor(color) {
    var lists = document.querySelectorAll('a');
    for (var i = 0; i < lists.length; i++) {
        lists[i].style.color = color;
    }
}
function setBodyColor(color) {
    document.querySelector('body').style.color = color;
}
function setBodyBackgroundColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}
function nightDayHandler(self) {
    if (self.value == 'night') {
        Body.setBackgroundColor('black');
        Body.setColor('white');
        self.value = 'day';
        Anchor.setColor('coral');
    } else {
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';
        Anchor.setColor('blue');
    }
}