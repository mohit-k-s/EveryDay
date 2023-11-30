int ballCount = 500 ;
int ballSize =  8;
int ballSpeed = 3; 

float[] xsp = new float[ballCount];
float[] ysp = new float[ballCount];
float[] xpos = new float[ballCount];
float[] ypos = new float[ballCount];
float[] wdth = new float[ballCount];
float[] hth = new float[ballCount];


void setup() {
  size(600 , 600 );
  background(0) ;
  for(int i =0; i < ballCount ; ++i ){
    xsp[i] = random(1 , ballSpeed )  ;
    ysp[i] = random (-ballSpeed , ballSpeed ) ;
    xpos[i] = width/2 + random(-width/3 , width/3);
    ypos[i] = height/2 + random(-height/3 , height/3);
    wdth[i] = random(1 , ballSize) ;
    hth[i] = wdth[i] ;
  } 
  
  noStroke();
  frameRate(30) ;

}

void draw() {
    background(0) ;
    for(int i =0; i < ballCount ; ++i ){
      ellipse(xpos[i] , ypos[i] , wdth[i] , hth[i] ) ;
      xpos[i] += xsp[i];
      ypos[i] += ysp[i];
      if(xpos[i] >= width - wdth[i]/2 || xpos[i] <= wdth[i]/2  ) {xsp[i] *=-1 ;}
      if(ypos[i] >= height - hth[i]/2 || ypos[i] <= hth[i]/2  ) {ysp[i] *=-1 ;}
  } 
} 
