const canvas = document.getElementById('c1')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// canvas settings 
ctx.fillStyle = 'white'
ctx.strokeStyle = 'black'
ctx.lineWidth = 1


// base to 

function repaintArray(array , context  , baseY , pivot = -1){
    console.log(context , baseY)
    function draw(context , x , baseY , h ) {
        if(pivot > -1 && x/10 === pivot  ){
            console.log(pivot)
            context.save();
            context.fillStyle = 'red';
            context.fillRect(x + 50  , baseY - h  ,5 , h );
            context.restore()
        }else {
            context.fillRect(x + 50  , baseY - h  ,5 , h );
        }
    }
    for(let i =0; i < array.length ; ++i) {
        if(!array[i]) continue;
        draw(context , i*10  , baseY , array[i]  ) ;
    }
}

function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectionSort(array){
    let n = array.length ;
    for(let i =0 ; i < n -1  ; ++ i){
        let minIndex = i ;
        let minVal = array[i] ;
        for(let j = i + 1  ; j < n ; ++j ){
            minVal = Math.min(minVal , array[j]) ;
            if(minVal === array[j]) minIndex = j ;
        }
        let cj = array[i] ;
        array[i] = array[minIndex] ;
        array[minIndex] = cj ;
        
        ctx.clearRect(0 , 0 , canvas.width , canvas.height )
        repaintArray(array , ctx , 500 , i )
        await sleep(50)
        
    }
}

async function bubbleSort(array){

    //Outer pass
    for(let i = 0; i < array.length; i++){

        //Inner pass
        for(let j = 0; j < array.length - i - 1; j++){

            //Value comparison using ascending order

            if(array[j + 1] < array[j]){

                //Swapping
                [array[j + 1],array[j]] = [array[j],array[j + 1]]
            }
            ctx.clearRect(0 , 0 , canvas.width , canvas.height )
            repaintArray(array , ctx , 500, i )
            await sleep(1)
        }
        ctx.clearRect(0 , 0 , canvas.width , canvas.height )
        repaintArray(array , ctx , 500)
        await sleep(1)

    };
    return arr;
};

async function insertionSort(array){
    //Start from the second element.
    for(let i = 1; i < array.length;i++){

        //Go through the elements behind it.
        for(let j = i - 1; j > -1; j--){
            
            //value comparison using ascending order.
            if(array[j + 1] < array[j]){

                //swap
                [array[j+1],array[j]] = [array[j],array[j + 1]];
                ctx.clearRect(0 , 0 , canvas.width , canvas.height )
                repaintArray(array , ctx , 500)
                await sleep(1)
            }
                    ctx.clearRect(0 , 0 , canvas.width , canvas.height )
        repaintArray(array , ctx , 500 , i )
        await sleep(1)
        }
    };

  return arr;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            [items[i], items[j]] = [items[j], items[i]];
            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSort(items, index, right);
        }
    }
    ctx.clearRect(0 , 0 , canvas.width , canvas.height  )
    repaintArray(items , ctx , 500 , index )
    await sleep(100)
    return items;
}
  


class ArrayElems {
    constructor(n) {
        this.array = [];
        for(let i =0; i <  n ; ++i) this.array.push(Math.random() * 400)
    }
}

let r = new ArrayElems(125) ;

bubbleSort(r.array , 0 , r.array.length -1 ).then(res => {
    console.log(res);
})