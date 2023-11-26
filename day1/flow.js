const canvas = document.getElementById('c1')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// canvas settings 
ctx.fillStyle = 'white'
ctx.strokeStyle = 'black'
ctx.lineWidth = 1 

function randColor(){
    return {r : Math.random() * 255 , g : Math.random()* 255 , b : Math.random() * 255 }
}


class Particle{
    constructor(effect){
        this.effect = effect 
        this.x = Math.floor(Math.random() * this.effect.width );
        this.y = Math.floor(Math.random() * this.effect.height ); 
        this.speedModifier = Math.floor(Math.random() *  .05 + 1 )
        this.speedX
        this.speedY
        this.history = [{x : this.x , y : this.y }]
        this.maxLen = Math.floor(Math.random() * 200 + 10 ) ;
        this.angle = 0;
        this.timer = this.maxLen * 2  ;
        const rc = randColor()
        this.color = `rgb(${rc.r} , ${rc.g} , ${rc.b})`

    }
    draw(context){
        context.beginPath()
        context.moveTo(this.history[0].x , this.history[0].y);
        this.history.forEach(pair => {
            context.lineTo(pair.x , pair.y) ;
        })
        context.strokeStyle = this.color; 
        context.stroke()

    }
    update(){
        this.timer--;
        if(this.timer >= 0) {
            let x = Math.floor(this.x / this.effect.cellSize) ;
            let y = Math.floor(this.y/ this.effect.cellSize) ;  
            let index = y * this.effect.cols + x  ;
            this.angle = this.effect.flowField[index];
            this.speedX = Math.cos(this.angle) * this.speedModifier
            this.speedY = Math.sin(this.angle) * this.speedModifier
    
            this.x += this.speedX 
            this.y += this.speedY 
    
            this.history.push({x : this.x , y : this.y })
            if(this.history.length === this.maxLen) this.history.shift()
        }else if(this.history.length > 1) this.history.shift() ;
        else this.reset()

    }
    reset(){
        this.x = Math.floor(Math.random() * this.effect.width );
        this.y = Math.floor(Math.random() * this.effect.height ); 
        this.history = [{x : this.x , y : this.y }]
        this.timer = this.maxLen * 2 
    }
}

class Effect{
    constructor(canvas , numParticles ) {
        this.canvas = canvas;
        this.width = canvas.width ;
        this.height = canvas.height ;
        this.particles = [] ;
        this.flowField = [];
        this.numParticles = numParticles
        this.cellSize =40 
        this.rows ;
        this.cols ;
        this.curve = 4.2
        this.zoom =  .12
        this.debug = false ;

        window.addEventListener('keydown' ,  e=> {
            if(e.key === 'd') {
                this.debug = !this.debug
            }
        })
        window.addEventListener('resize' , e => {
            this.resize(e.target.innerWidth , e.target.innerHeight )
        })
        this.init();
    }
    init(){
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize)
        for(let i =0; i < this.rows ; ++i){
            for(let j =0; j< this.cols ; ++j) {
                let angle = (
                     Math.cos( i * this.zoom ) * Math.sin(j * this.zoom ) 
                    ) * this.curve  ;
                this.flowField.push(angle)
            }
        }
        for(let i =0; i < this.numParticles ; ++i) this.particles.push(new Particle(this))
    }
    drawGrid(context){
        context.save()
        context.lineWidth = .3 
        context.strokeStyle = 'red';
        for(let i =0; i < this.cols ; ++i){
            context.beginPath()
            context.moveTo(this.cellSize * i , 0) ;
            context.lineTo(this.cellSize * i , this.height) ;
            context.stroke();
        }

        for(let i =0; i < this.rows ; ++i){
            context.beginPath()
            context.moveTo(0  , this.cellSize * i ) ;
            context.lineTo(this.width , this.cellSize * i  ) ;
            context.stroke();
        }
        context.restore()
    }
    render(context){
        if(this.debug){
            this.drawGrid(context)
        }

        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
    }

    resize(width , height){
        this.canvas.width = width 
        this.canvas.height = height
        this.width = width 
        this.height = height
    }

}

const effect = new Effect(canvas,  5000 ) ;

function animate(){
    ctx.clearRect(0 , 0 , canvas.width , canvas.height )
    effect.render(ctx)
    requestAnimationFrame(animate);
}

animate()



