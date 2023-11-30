int xspeed , yspeed , xposition, yposition , w , h ;

void singleBall() {
  size(400 , 400) ;
  background(0) ;
  xspeed = 3 ;
  yspeed = 6; 
  w = h =10 ;
  noStroke() ;
  xposition = width /2 ;
  yposition = height /2 ; 
}

void drawSingleBall() {
  background(0) ;
  ellipse(xposition , yposition , w, h) ;
  xposition += xspeed ;
  yposition += yspeed ;
  
  if(xposition >= width - w/2 || xposition <= w/2  ) {xspeed *=-1 ;}
  if(yposition >= height - h/2 || yposition <= h/2  ) {yspeed *=-1 ;}
  
}
