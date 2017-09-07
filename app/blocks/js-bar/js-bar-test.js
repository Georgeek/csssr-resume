//http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var adiv = document.getElementById('slider')
const thumbElem = adiv.children[0];
var starttime

function moveit(timestamp, el, dist, duration){
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    el.style.left = (dist * progress).toFixed(2) + 'px'
    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, el, dist, duration)
        })
    }
}

requestAnimationFrame(function(timestamp){
  starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
  moveit(timestamp, adiv, 400, 2000) // 400px over 1 second
})
