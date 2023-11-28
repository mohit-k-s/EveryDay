// we experiment with circles add some kind of motion to them 

const canvas = document.getElementById('c1')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// canvas settings 
ctx.fillStyle = 'white'
ctx.strokeStyle = 'white'
ctx.lineWidth = 1 

let cellSize = 20 ;
let rows = canvas.height / cellSize 
let cols = canvas.width / cellSize 

function getColor(x, y) {
    return  {
        r : 255 ,
        g : ( 255 / (canvas.height ) ) * y,
        b : 0 
    } ; 
}

/// what if each shape is following a circle clockwise 

// let's have n rings 
// each ring be some distance apart 
// each ring moves '=
// let's say in 1 second we want each one to complete the circle so the angular velocity is 2*pi 

class Circle{
    constructor(x, y, initAngle ){
        this.x = x ;
        this.y = y ;
        this.initAngle = initAngle ;
    }
    draw(ctx , color ){
        ctx.save();
        ctx.strokeStyle =  `rgb(${color.r} , ${color.g} , ${color.b})`
        ctx.beginPath()
        ctx.ellipse(this.x, this.y , 10 , 10 , 0 , 0 , Math.PI * 2  ) ;
        ctx.stroke();
    }
}

class Ring{
    constructor(num , radius , velo , clockWise ,centreX , centreY ){
        this.baseX = 
        this.circles = [];
        this.num = num ;
        this.radius = radius ;
        this.velo = velo 
        this.lastTime = 0 
        this.clockWise = clockWise 
        this.centreX = centreX 
        this.centreY = centreY 
        this.color = getColor(this.centreX  ,this.centreY )
    }
    init(){
        for(let i =0 ; i < this.num ; ++i  ){
            this.circles.push(
                new Circle(
                    this.centreX + this.radius * Math.cos( i * 2 * Math.PI / this.num)  ,
                   this.centreY  + this.radius * Math.sin(i *2 * Math.PI / this.num)   ,
                    i * 2 * Math.PI / this.num
                )
            )
        }
    }
    update(speed){
        this.delta = Date.now() - this.lastTime ;
        this.lastTime = Date.now() ;
        for(let i =0 ; i < this.num ; ++i  ){
            let newAngle = this.circles[i].initAngle + (this.clockWise ? 1 : -1 ) * speed ;
            this.circles[i].x = this.centreX + this.radius * Math.cos(newAngle ) 
            this.circles[i].y =this.centreY + this.radius * Math.sin( newAngle ) 
        }
    }
    render(ctx){
        this.circles.forEach(circle => {
            circle.draw(ctx , this.color);
        })
    }
}

const effect = [] ;



for(let i =0 ; i < 2; ++i) {
    const rings = [] ;
    for(let i =0 ; i< 100 ; ++i) {
        rings.push(
            new Ring(
                9 , i * 30 , 1 , i % 2 === 0,
                canvas.width * Math.random() ,
                canvas.height * Math.random()
                )
            )
    }
    effect.push(rings)
}

effect.forEach(rings => {
    rings.forEach(ring => {
    ring.init();
    ring.render(ctx) ;
})
});

function animate(){
    ctx.clearRect(0 , 0 , canvas.width , canvas.height )

    effect.forEach(rings => {
        rings.forEach(ring => {
            ring.update(
                Date.now()/250
                );
                ring.render(ctx);
    })
    });
    requestAnimationFrame(animate)
}

animate()


// function effect(){
//     for(let y =0; y < cols ; ++y){
//         for(let x =0 ; x < rows ; ++x){
//             ctx.beginPath();
//             let z = Math.random() * 10
//             ctx.save()
//             const color = getColor( Math.cos(-Math.exp(z)) * 100  ,y * 100 * Math.sin(z) )

//             ctx.strokeStyle = `rgb(${color.r} , ${color.g} , ${color.b})`
//             ctx.ellipse(
//                 Math.cos(-Math.exp(z)) * 100  ,
//                 y * 100 * Math.sin(z),
//                 z , z , z , 0 , 2 * Math.PI)
//             ctx.stroke();
//             ctx.restore()
//         }
//     }
// }


