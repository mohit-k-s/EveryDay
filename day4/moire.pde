float spacer;
float interval ;

float angle=0;
float amplitude = .05 ;

float waveGap = 10 ;
float frequency = .1;
float rGr =.5;
boolean isInactive = true;

void setup(){
  size(400 , 400 );
  interval = width * .03;
  spacer = interval ;
  noFill() ;
  frameRate(30);
}

void draw(){
    background(0) ;
    stroke(255) ;
    float py = 0 ;
    for(int i =0 ; i < height ; ++i) {
      for(int j =0; j< width ; ++j ) {
        py = i+ sin(radians(angle)) *mouseY * amplitude ;
        point(j , py) ;
        angle += mouseX * frequency ;
      }
    }
    
    for(int i =0 ; i < width /2 * spacer / interval  ; i += spacer){
      ellipse(mouseX , mouseY , 10 + i , 10 + i) ;
    }
    
    if(mousePressed) {
      angle =0 ;
      isInactive = false ;
      
      if(spacer < interval * 2 ) {
        spacer += rGr ;
      }
    }
    
    if(isInactive){
      if(spacer > interval ) {
      spacer -= rGr;
    }
    
    }

}


void mouseReleased() {
  isInactive = true ;
}
