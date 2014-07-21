//Define constants

ALIVE = 1;
DEAD = 0;

//Define Cell class
function Cell(i, j) {

  this.State = DEAD;
  this.i = i;
  this.j = j;

  this.Top = null;
  this.Right = null;
  this.Left = null;
  this.Bottom = null;
  this.LeftTop = null;
  this.LeftBottom = null;
  this.RightTop = null;
  this.RightBottom = null;

  this.toString = function () {

    return this.i + ":" + this.j + " is " + this.State;

  }

}


function BuildBoard(size) {

  //Build board
  var board = new Array(size);
  
  for (var i = 0; i < size; i++) {
    board[i] = new Array(size);

    for (var j = 0; j <size; j++) {

      var thisCell = new Cell(i, j);
      board[i][j] = thisCell;

    }

  }

  //Assign appropriate cell references
  for (i = 0; i < size; i++ ) {
    for ( j = 0; j < size; j++) {
      
      if( j < size) { board[i][j].Bottom = board[i][j + 1]; }
      if( j > 0) { board[i][j].Top = board[i][j - 1]; }

      if( i > 0) {
        
        board[i][j].Left = board[i - 1][j];  

        if( j > 0) { board[i][j].LeftTop = board[i - 1][j - 1] };
        if( j < size - 1) { board[i][j].LeftBottom = board[i - 1][j + 1] };

      }

      if( i < size - 1) {

        board[i][j].Right = board[i + 1][j]; 

        if( j > 0 ) { board[i][j].RightTop = board[i + 1][j - 1]; }
        if( j < size - 1) { board[i][j].RightBottom = board[i + 1][j + 1]; }

      }

    }

  }

  return board;
  
}


function Tick(board) {
  
  //Pull size and copy
  var size = board.length;
  var copiedBoard = BuildBoard(size);
  
  for (i = 0; i < size; i++ ) {

    for (j = 0; j < size; j++) {

      var cell = board[i][j];
      var thisCell = copiedBoard[i][j];

      var  neighborCount =  
          (cell.Top !== null && typeof cell.Top !== "undefined" ? cell.Top.State : 0 ) + 
          (cell.Right !== null && typeof cell.Right !== "undefined"  ? cell.Right.State : 0 ) +
          (cell.Left !== null && typeof cell.Left !== "undefined"  ? cell.Left.State : 0 ) +
          (cell.Bottom !== null && typeof cell.Bottom !== "undefined"  ? cell.Bottom.State : 0 ) +
          (cell.LeftTop !== null && typeof cell.LeftTop !== "undefined"  ? cell.LeftTop.State : 0 ) +
          (cell.LeftBottom !== null && typeof cell.LeftBottom !== "undefined"  ? cell.LeftBottom.State : 0 ) +
          (cell.RightTop !== null  && typeof cell.RightTop !== "undefined"  ? cell.RightTop.State : 0 ) +
          (cell.RightBottom !== null && typeof cell.RightBottom !== "undefined"  ? cell.RightBottom.State : 0 );

      if( cell.State === ALIVE ) {

        if(neighborCount < 2) {

          thisCell.State = DEAD;

        } else if (neighborCount === 2 || neighborCount === 3) {

          thisCell.State = ALIVE;

        } else if (neighborCount > 3 ) {

          thisCell.State = DEAD;

        }
      } else if ( cell.State === DEAD ) {

        if( neighborCount === 3 ) {

          thisCell.State = ALIVE;

        }

      }

    }

  }

  return copiedBoard;
}

function BuildTable(table, board) {
  
  var size = board.length;
  
  for (var i = 0; i < size; i++) {

    table.append("<tr id=row-" + i + "></tr>");

    for( var j = 0; j < size; j ++ ) {

      reference = 'row-' + i + '-column-' + j ;
      $("#row-" + i ).append('<td id="' + reference + '">  </td>');  

    }

  }
    
}

function UpdateTable(table, board) {
  
  var size = board.length;
  
  for (var i = 0; i < size; i++) {

    for( var j = 0; j < size; j ++ ) {

      var color = "blue";

      if( board[i][j].State === ALIVE ) {

        color = "yellow";

      }

      reference = 'row-' + i + '-column-' + j ;
      $('#' + reference ).css("background-color",color);
      

    }

  }  
  
}