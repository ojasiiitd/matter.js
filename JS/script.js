var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    windowWidth = win.innerWidth || htm.clientWidth || body.clientWidth,
    windowHeight = win.innerHeight || htm.clientHeight || body.clientHeight;
var myCanvas = document.getElementById("myWorld");

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create();
var render = Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
      width: 
      windowWidth,
      height: 
      windowHeight,
      background: "black",
      wireframes: false,
      showAngleIndicator: false
    }
  });
var ew = engine.world;

var turf = Bodies.rectangle(windowWidth/2+200, 1020 , windowWidth+400 , 300 , {
    render: {
        fillStyle: "rgb(180, 177, 177)"
    },
    isStatic: true
});
World.add(ew , turf);

var basketBall = Bodies.circle(250 , 650 , 30 , {
    render: {
        fillStyle: "rgb(200, 82, 27)"
    },
    frictionAir: 0,
    restitution: 1
});
World.add(ew , basketBall);

var holder = Bodies.circle(370 , 620 , 0 , {
    render: {
        fillStyle: "white"
    },
    isStatic: true
});
World.add(ew , holder);

var slingShot = Constraint.create({
    render:{
        strokeStyle: "blue"
    },
    bodyA: holder,
    bodyB: basketBall,
    length: 124,
    stiffness: 0.4
});
World.add(ew , slingShot);

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
World.add(ew , mouseConstraint);


function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max)
{
    return (Math.random() * (max - min + 1) + min);
}

// const go = document.querySelector("button");
// go.addEventListener("click" ,  function () {
    Engine.run(engine);
// });
Render.run(render);