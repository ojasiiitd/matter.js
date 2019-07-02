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
    engine: engine,
    options: {
      wireframes: false
    }
});

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = windowWidth;
canvas.height = windowHeight;

var wallopts = {
    render: {
        fillStyle: "green",
    },
    friction: 0,
    isStatic: true
};

var ground = Bodies.rectangle(canvas.width/2 , canvas.height+120 , canvas.width , 300 , wallopts),
    leftWall = Bodies.rectangle(-120 , canvas.height/2 , 300 , canvas.height , wallopts) ,
    rightWall = Bodies.rectangle(canvas.width+110 , canvas.height/2 , 300 , canvas.height , wallopts);
World.add(engine.world, [ground , leftWall , rightWall]);

var slide = [];
slide.push(Bodies.rectangle(300 , 100 , 1500 , 10 , {
    render: {
        fillStyle: "green",
    },
    isStatic: true,
    angle: 16*Math.PI/180
    }));
slide.push(Bodies.rectangle(1460 , 350 , 900 , 10 , {
    render: {
        fillStyle: "green",
    },
    isStatic: true,
    angle: -16*Math.PI/180
    }));
slide.push(Bodies.rectangle(300 , 500 , 1500 , 10 , {
    render: {
        fillStyle: "green",
    },
    isStatic: true,
    angle: 16*Math.PI/180
    }));
World.add(engine.world , slide);

var elements = [];
canvas.addEventListener("mousemove" , createElements);
function createElements()
{
    console.log(event);
    var x = event.clientX , y = event.clientY ,
        sides = getRandomInt(3 , 8);
        radius = getRandomInt(1 , 10);
        opts = {
            render: {
                fillStyle: "slateblue",
            },

            friction: 0,
            restitution: 1,
            mass: 10,
            force: {
                x: getRandomFloat(-.7 , .7),
                y: getRandomFloat(-.7 , .7)
            },
        };
        add = Bodies.circle(x , y , radius , opts);
    // console.log(add);
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