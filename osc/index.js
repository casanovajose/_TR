const { Bundle, Client } = require("node-osc");

const config = {
  resolution: 1000,
  mode: "S",
  osc: {
    port: 666,
    host: "127.0.0.1"
  }
}
const client = new Client("127.0.0.1", config.osc.port || 666);
const trajectories = {}

// math
function calcAngleDegrees(x, y) {
return Math.atan2(y, x) * 180 / Math.PI;
}

//const createTrajectory

function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

function circle (radius, steps, centerX, centerY){
    const traj = []
    var xValues = [centerX];
    var yValues = [centerY];
    for (var i = 0; i < steps; i++) {
        const point = {}
        point.x = Math.round((centerX + radius * Math.cos(2 * Math.PI * i / steps)));
        point.y = Math.round((centerY + radius * Math.sin(2 * Math.PI * i / steps)));
        // pan
        point.angle =  Math.abs(Math.atan2(point.y - radius, point.x - radius) * (180 / Math.PI)); // in radians
        //point.r = point.x /  (2*radius);
        //point.l = 1 - point.x / (2*radius)
        // dist
        point.amp  =   (2*radius) - point.y;
        traj.push(point)
        
    }
    //console.log(traj);
    return traj;
}

// console.log();
 
const formulas = {
    circle({name, x, y, r}) {
        // (x−h)2+(y−k)2=r2
        const traj = []



    },
    noisePoints() {

    },
    gaussianRandomPoints() {

    }
}

let i = 0;
let j = 0;
const traj = circle(190, 80, 200, 200);
setInterval(() => {
    const data = [
        ["/x", traj[i].x], ["/y", traj[i].y], ["/dist", traj[i].amp], ["/ang", traj[i].angle]
    ]
    // const data = [["/
    if (j === 0) {
        data.push(["/on"])
    }
    j++;
    if (j === 3) {
        data.push(["/off"])
        j = 0;
    }
    //console.log(data);
    // a bundle without an explicit time tag
    const bundle = new Bundle(...data);
    client.send(bundle);
    
    i = (i+1)% (traj.length);
    // console.log("i ", i)
}, 250)




// a bundle with a timetag of 10
// bundle.append(new Bundle(10, ["/note", 440]));

