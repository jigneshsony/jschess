/*jsl:import BoardPiece.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/


/**
  @class represents a full position of the board
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var BoardPosition = Class.create(/** @lends BoardPosition# */{
  /**
    constructs a new object
    @return {BoardPosition} a new object of this type.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    this.pieces = [];
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} a string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return this.pieces.join();
  },
  /**
    Add a piece to the position
    @param {string} color the color of the piece (black/white).
    @param {string} type the type of the piece
    (rook/knight/bishop/queen/king/pawn).
    @param {number} x the x position of the piece [0..8).
    @param {number} y the y position of the piece [0..8).
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiece: function(color, type, x, y) {
    var boardPiece = new BoardPiece(new PieceColor(color), new PieceType(type));
    var piecePosition = new PiecePosition(x, y);
    this.pieces.push([boardPiece, piecePosition]);
  },
  /**
    Run a function for each piece in this position
    @param {function} f function to run getting each piece in turn.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEachPiece: function(f) {
    this.pieces.forEach(function(pieceAndPos) {
      var boardPiece = pieceAndPos[0];
      var position = pieceAndPos[1];
      f(boardPiece, position);
    });
  }
});


/**
  Static method that returns a starting position in standard chess.
  @return {BoardPosition} A standard chess starting position.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
BoardPosition.startPos = function() {
  /*
  var newPos=new BoardPosition();
  newPos.addPiece('white','rook',0,0);
  newPos.addPiece('white','knight',1,0);
  newPos.addPiece('white','bishop',2,0);
  newPos.addPiece('white','queen',3,0);
  newPos.addPiece('white','king',4,0);
  newPos.addPiece('white','bishop',5,0);
  newPos.addPiece('white','knight',6,0);
  newPos.addPiece('white','rook',7,0);
  newPos.addPiece('white','pawn',0,1);
  newPos.addPiece('white','pawn',1,1);
  newPos.addPiece('white','pawn',2,1);
  newPos.addPiece('white','pawn',3,1);
  newPos.addPiece('white','pawn',4,1);
  newPos.addPiece('white','pawn',5,1);
  newPos.addPiece('white','pawn',6,1);
  newPos.addPiece('white','pawn',7,1);

  newPos.addPiece('black','rook',0,7);
  newPos.addPiece('black','knight',1,7);
  newPos.addPiece('black','bishop',2,7);
  newPos.addPiece('black','queen',3,7);
  newPos.addPiece('black','king',4,7);
  newPos.addPiece('black','bishop',5,7);
  newPos.addPiece('black','knight',6,7);
  newPos.addPiece('black','rook',7,7);
  newPos.addPiece('black','pawn',0,6);
  newPos.addPiece('black','pawn',1,6);
  newPos.addPiece('black','pawn',2,6);
  newPos.addPiece('black','pawn',3,6);
  newPos.addPiece('black','pawn',4,6);
  newPos.addPiece('black','pawn',5,6);
  newPos.addPiece('black','pawn',6,6);
  newPos.addPiece('black','pawn',7,6);
  return newPos;
  */
  return BoardPosition.setupFEN(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );
};


/**
  Setup a position according to FEN notation.
  See Forsyth–Edwards Notation in wikipedia for more details.
  Example of start position is:
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  @param {string} fen a string describing a chess board position in FEN
  notation.
  @return {BoardPosition} A position object corresponding to the FEN
  notation given.
  @author mark.veltzer@gmail.com (Mark Veltzer)
  TODO
  - add more sanity tests (regexp) for the whole input.
  - parse the 5 other blocks after the position itself
  (what do I do with that ?!?).
*/
BoardPosition.setupFEN = function(fen) {
  var blocks = fen.split(' ');
  if (blocks.length != 6) {
    throw 'parse error - number of blocks is not 6';
  }
  var ranks = blocks[0].split('/');
  if (ranks.length != 8) {
    throw 'parse error - number of ranks is not 8';
  }
  var newPos = new BoardPosition();
  for (var irank = 7; irank >= 0; irank--) {
    var rank = ranks[7 - irank];
    for (var iletter = 0; iletter < rank.length; iletter++) {
      var letter = rank[iletter];
      switch (letter) {
        case 'r':
          newPos.addPiece('black', 'rook', iletter, irank);
          break;
        case 'R':
          newPos.addPiece('white', 'rook', iletter, irank);
          break;
        case 'n':
          newPos.addPiece('black', 'knight', iletter, irank);
          break;
        case 'N':
          newPos.addPiece('white', 'knight', iletter, irank);
          break;
        case 'b':
          newPos.addPiece('black', 'bishop', iletter, irank);
          break;
        case 'B':
          newPos.addPiece('white', 'bishop', iletter, irank);
          break;
        case 'q':
          newPos.addPiece('black', 'queen', iletter, irank);
          break;
        case 'Q':
          newPos.addPiece('white', 'queen', iletter, irank);
          break;
        case 'k':
          newPos.addPiece('black', 'king', iletter, irank);
          break;
        case 'K':
          newPos.addPiece('white', 'king', iletter, irank);
          break;
        case 'p':
          newPos.addPiece('black', 'pawn', iletter, irank);
          break;
        case 'P':
          newPos.addPiece('white', 'pawn', iletter, irank);
          break;
        default:
          iletter += Number(letter) - 1;
          break;
      }
    }
  }
  return newPos;
};
