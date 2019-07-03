var win = window,
    doc = document,
    htm = doc.documentElement,
    body = doc.getElementsByTagName("body")[0];
    windowWidth = win.innerWidth || htm.clientWidth || body.clientWidth,
    windowHeight = win.innerHeight || htm.clientHeight || body.clientHeight;

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
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
var ctx = canvas.getContext("2d");

var wallopts = {
    render: {
        fillStyle: "rgb(43, 43, 43)",
    },
    friction: 0,
    isStatic: true
};

var ground = Bodies.rectangle(canvas.width/2 , canvas.height+120 , canvas.width , 300 , wallopts);
    leftWall = Bodies.rectangle(-120 , canvas.height/2 , 300 , canvas.height , wallopts) ,
    rightWall = Bodies.rectangle(canvas.width+110 , canvas.height/2 , 300 , canvas.height , wallopts);
World.add(engine.world, [ground , leftWall , rightWall]);

var opts = {
    render: {
        fillStyle: "yellow",
    },
    friction: 0,
    restitution: 1,
};

var box = Bodies.rectangle(500 , 300 , 60 , 40 , {
    render: {
        fillStyle: "yellow",
    },
    friction: 0,
    restitution: 1,
    // isStatic : true
}),
    ball = Bodies.circle(820 , 80 , 40 , opts);

World.add(engine.world , [box , ball]);

var constraintOptions = {
    bodyA: box,
    bodyB: ball,
    length: 200,
    stiffness: 1,
};

var spring = Constraint.create(constraintOptions);
World.add(engine.world , spring);

var mousey = MouseConstraint.create(engine , {
    render: {
        lineWidth: 0
    }
});

World.add(engine.world , mousey);

// var slide = [];
// slide.push(Bodies.rectangle(300 , 100 , 1500 , 10 , {
//     render: {
//         fillStyle: "green",
//     },
//     isStatic: true,
//     angle: 16*Math.PI/180
//     }));
// slide.push(Bodies.rectangle(1460 , 350 , 900 , 10 , {
//     render: {
//         fillStyle: "red",
//     },
//     isStatic: true,
//     angle: -16*Math.PI/180
//     }));
// slide.push(Bodies.rectangle(300 , 500 , 1500 , 10 , {
//     render: {
//         fillStyle: "white",
//     },
//     isStatic: true,
//     angle: 16*Math.PI/180
//     }));
// World.add(engine.world , slide);

// canvas.addEventListener("mousemove" , createElements);
// function createElements()
// {
//     var x = event.clientX , y = event.clientY ,
//         sides = getRandomInt(3 , 8);
//         radius = getRandomInt(7 , 17);
//         opts = {
//             render: {
//                 fillStyle: "yellow",
//             },

//             friction: 0,
//             restitution: 1,
//             mass: 15,
//             force: {
//                 x: getRandomFloat(-1 , 1),
//                 y: getRandomFloat(-1 , 1)
//             },
//         };
//         add = Bodies.polygon(x , y , sides , radius , opts);
//     World.add(engine.world , add);
// }

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