var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    windowWidth = win.innerWidth || htm.clientWidth || body.clientWidth,
    windowHeight = win.innerHeight || htm.clientHeight || body.clientHeight;

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine
});

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = windowWidth;
canvas.height = windowHeight - 7;

var ground = Bodies.rectangle(canvas.width/2 , canvas.height-(60/2) , canvas.width , 60 , { isStatic: true }),
    leftWall = Bodies.rectangle(15 , canvas.height/2 , 30 , canvas.height , { isStatic: true }) ,
    rightWall = Bodies.rectangle(canvas.width-30 , canvas.height/2 , 30 , canvas.height , { isStatic: true });
World.add(engine.world, [ground , leftWall , rightWall]);

var elements = [];
canvas.addEventListener("click" , createElements);
function createElements()
{
    var x = event.clientX , y = event.clientY ,
        sides = getRandomInt(3 , 8);
        radius = getRandomInt(30 , 80);
        opts = {
            friction: 0,
            restitution: 1,
            force: {
                x: getRandomFloat(-.7 , .7)
            },
        };
        add = Bodies.polygon(x , y , sides , radius , opts);
    console.log(add);
    World.add(engine.world , add);
    elements.push(add);
}

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

Engine.run(engine);
Render.run(render);