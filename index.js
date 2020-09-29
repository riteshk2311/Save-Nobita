score = 0;
cross = true;

audio = new Audio('doraemon.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        hero = document.querySelector('.hero');
        hero.classList.add('animatehero');
        setTimeout(() => {
            hero.classList.remove('animatehero')
        }, 700);
    }
    if (e.keyCode == 39) {
        hero = document.querySelector('.hero');
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = heroX + 112 + "px";
    }
    if (e.keyCode == 37) {
        hero = document.querySelector('.hero');
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = (heroX - 112) + "px";
    }
}

setInterval(() => {
    hero = document.querySelector('.hero');
    gameOver = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(hero, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleani')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updatescore(score) {
    scorecount.innerHTML = "Your Score: " + score
}