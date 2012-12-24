<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>jschess</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
		<script src="../thirdparty/jquery-1.8.3.min.js"></script>
		<script src="../thirdparty/raphael-2.1.0.min.js"></script>
		<!-- our code, three options: minified, regular or file by file -->
		<!--script src="../out/jschess-${ver}.min.js"></script-->
		<!--script src="../out/jschess-${ver}.js"></script-->
		<script src="../src/Utils.js"></script>
		<script src="../src/SvgPathAndAttributes.js"></script>
		<script src="../src/SvgPiece.js"></script>
		<script src="../src/SvgCreator.js"></script>
		<script src="../src/SvgPixelPosition.js"></script>
		<script src="../src/SvgPieceData.js"></script>
		<script src="../src/SvgBoard.js"></script>
		<script src="../src/PiecePosition.js"></script>
		<script src="../src/PieceColor.js"></script>
		<script src="../src/PieceType.js"></script>
		<script src="../src/BoardPiece.js"></script>
		<script src="../src/BoardPosition.js"></script>
		<script src="../src/Board.js"></script>

		<!-- syntax highlighter stuff -->
		<!-- Include required JS files -->
		<script type="text/javascript" src="../thirdparty/sh/scripts/shCore.js"></script>
		<!--
			At least one brush, here we choose JS. You need to include a brush for every
			language you want to highlight
		-->
		<script type="text/javascript" src="../thirdparty/sh/scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="../thirdparty/sh/scripts/shBrushXml.js"></script>
		<!-- Include *at least* the core style and default theme -->
		<link href="../thirdparty/sh/styles/shCore.css" rel="stylesheet" type="text/css" />
		<link href="../thirdparty/sh/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />

		<!-- You also need to add some content to highlight, but that is covered elsewhere. -->
			 
		<script>
			$(document).ready(function() {
				// Finally, to actually run the highlighter, you need to include this JS on your page
				SyntaxHighlighter.all()
				var board=new SvgBoard({
					id:'myid',
				})
				board.startpos()
				$('#startpos').click(function() {
					board.startpos()
				})
				$('#moverooks').click(function() {
					board.moverooks()
				})
				$('#moveknights').click(function() {
					board.moveknights()
				})
				$('#movebishops').click(function() {
					board.movebishops()
				})
				$('#flip').click(function() {
					board.flip()
				})
				$('#dump').click(function() {
					board.dump()
				})
			})
		</script>
	</head>
	<body>
		<h1>Demo2 - moving the pieces</h1>
		First download the minified file from <a title="jschess download" href="../out/jschess-${ver}.min.js">here</a>.
		Place the file somewhere on your web server and import it from your HTML like this:
		<pre class="brush: xml">
			&lt;script src="jschess-${ver}.min.js"&gt;&lt;/script&gt;
		</pre>
		You need a place for your board, so place something like this somewhere in your html:
		<pre class="brush: xml">
			&lt;div id="myid"&gt;
			&lt;/div&gt;
		</pre>
		Then you can create a board from your javascript code by calling the constructor of SvgBoard. The board will be empty so we call startpos to get initial game position:
		<pre class="brush: js">
		var board=new SvgBoard({
			id:'myid',
		})
		board.startpos()
		</pre>
		Here is the result:
		<div id="myid">
		</div>
		<button id="startpos">startpos</button>
		<button id="moverooks">moverooks</button>
		<button id="moveknights">moveknights</button>
		<button id="movebishops">movebishops</button>
		<button id="flip">flip</button>
		<button id="dump">dump</button>
		<br/>
		<h3>Mark Veltzer, 2012</h3>
	</body>
</html>
