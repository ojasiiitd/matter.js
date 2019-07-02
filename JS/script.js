// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var canvas = document.getElementsByTagName("canvas")[0];
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, 0, 30, 1200 , { isStatic: true });
var rightWall = Bodies.rectangle(canvas.width, 0, 30, 1200, { isStatic: true });
var balls = [];
var options = {
    frictionAir: 0.01 , 
    friction: 0.2 , 
    restitution: 0.8 ,
    force: {
        x: .4,
        y: .4
    }
};

canvas.addEventListener("click" , function() {
var newBall = Bodies.circle(event.clientX ,event.clientY , 40 , options);
console.log(newBall);
balls.push(newBall);
World.add(engine.world, balls[balls.length-1]);
});

// add all of the bodies to the world
World.add(engine.world, [ground , leftWall , rightWall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);