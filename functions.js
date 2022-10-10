

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

const el1 = document.getElementById('basket');
const el2 = document.getElementById('btnleft');
const el3 = document.getElementById('btnright');

console.log(elementsOverlap(el1, el2)); // 👉️ true

// $('#left').click(() => {
//     $('#right').removeAttr("disabled");
//     $('#left').removeAttr("disabled");
//     if (elementsOverlap(el1, el2)) {
//         $('#left').attr("disabled", "true");
//     }
//     $('#basket').css({
//         'marginLeft': "-=70px" //moves left
//     });
// });

// $('#right').click(() => {
//     $('#right').removeAttr("disabled");
//     $('#left').removeAttr("disabled");
//     if (elementsOverlap(el1, el3)) {
//         $('#right').attr("disabled", "true");
//     }
//     $('#basket').css({
//         'marginLeft': "+=70px" //moves left
//     });
// });

$(document).ready(function () {
    if (!window.matchMedia("(max-width: 1280px)").matches) {
        $(document).on('mousemove', function (e) {
            basket.css('left', e.pageX);
        });
    } else {

    }
});


function egg_down(egg) {
    egg_current_position = parseInt(egg.css('top'));
    egg.css('top', egg_current_position + speed);
}


function check_egg_hits_floor(egg) {
    if (collision(egg, floor)) {
        show_bulls_eye(egg);
        decrement_life();
        return true;
    }
    return false;
}

function set_egg_to_initial_position(egg) {
    egg.css('top', egg_initial_position);
}

function show_bulls_eye(egg) {
    bullseye_num = egg.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {
    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
    life_span.text(life);
}

function check_egg_hits_basket(egg) {
    if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
        if (egg_top < basket_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 16 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});


let Rightinterval, Righttimeout, Leftimeout, Lefttimeout;

function touchStartRight() {
    rightfunc();
    Rightinterval = setTimeout(function () {
        Rightinterval = setInterval(function () {
            rightfunc();
        }, 10);
    }, 10);
}

function touchEndRight() {
    clearTimeout(Rightinterval);
    clearInterval(Rightinterval);
}

function rightfunc() {
    $('#left').css({
        'display': "block" //moves left
    });
    $('#right').css({
        'display': "block" //moves left
    });
    if (elementsOverlap(el1, el3)) {
        clearTimeout(Rightinterval);
        clearInterval(Rightinterval);
        $('#right').css({
            'display': "none" //moves left
        });
    }
    $('#basket').css({
        'marginLeft': "+=5px" //moves right
    });
}


function touchStartLeft() {
    leftfunc();
    Rightinterval = setTimeout(function () {
        Rightinterval = setInterval(function () {
            leftfunc();
        }, 10);
    }, 10);
}

function touchEndLeft() {
    clearTimeout(Rightinterval);
    clearInterval(Rightinterval);
}

function leftfunc() {
    $('#left').css({
        'display': "block" //moves left
    });
    $('#right').css({
        'display': "block" //moves left
    });
    if (elementsOverlap(el1, el2)) {
        clearTimeout(Rightinterval);
        clearInterval(Rightinterval);
        $('#left').css({
            'display': "none" //moves left
        });
    }
    $('#basket').css({
        'marginLeft': "-=5px" //moves left
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#right").addEventListener("touchstart", touchStartRight);
    document.querySelector("#right").addEventListener("touchend", touchEndRight);
    document.querySelector("#left").addEventListener("touchstart", touchStartLeft);
    document.querySelector("#left").addEventListener("touchend", touchEndLeft);
});