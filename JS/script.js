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

var newBall = Bodies.circle(100 , 100 , 40);
balls.push(newBall);
var newBall = Bodies.circle(160 , 100 , 40);
balls.push(newBall);
var newBall = Bodies.circle(220 , 100 , 40);
balls.push(newBall);
var newBall = Bodies.circle(280 , 100 , 40);
balls.push(newBall);
var newBall = Bodies.circle(340 , 100 , 40);
balls.push(newBall);
var newBall = Bodies.circle(400 , 100 , 40);
balls.push(newBall);

// add all of the bodies to the world
World.add(engine.world, [ground , leftWall , rightWall]);
World.add(engine.world, balls);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);