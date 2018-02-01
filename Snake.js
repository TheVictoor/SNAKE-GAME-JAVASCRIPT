class Snake {

	constructor() {
		this.snake = new Array();

		// INICIALIZAR SNAKE

		let x, y;
		x = 150;
		y = 150;

		// FUNÇÃO PARA INICIALIZAR A UM ARRAY DE SNAKE
		for ( let i = 0; i < 5; i++ ) {
			let elt1 = document.createElement( "div" );
			elt1.classList.add( 'snake' );

			elt1.style.marginLeft = x + 'px';
			elt1.style.marginTop = 0 + 'px';
			x -= 10;

			window.controler.campo.appendChild( elt1 );
			this.snake.push( elt1 );
		}
	}

	moveLeft () {
		if ( parseInt( this.snake[ 0 ].style.marginLeft ) <= 0 ) {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginLeft = '690px';
			this.snake[ 0 ].style.marginTop = parseInt( this.snake[ 1 ].style.marginTop ) + 'px';
		} else {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginLeft = ( parseInt( this.snake[ 1 ].style.marginLeft ) - 10 ) + 'px';
			this.snake[ 0 ].style.marginTop = parseInt( this.snake[ 1 ].style.marginTop ) + 'px';
		}

		this.eat();
	}

	moveRight () {
		if ( parseInt( this.snake[ 0 ].style.marginLeft ) >= 690 ) {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginLeft = 0 + 'px';
			this.snake[ 0 ].style.marginTop = parseInt( this.snake[ 1 ].style.marginTop ) + 'px';
		} else {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginLeft = ( parseInt( this.snake[ 1 ].style.marginLeft ) + 10 ) + 'px';
			this.snake[ 0 ].style.marginTop = parseInt( this.snake[ 1 ].style.marginTop ) + 'px';
		}

		this.eat();
	}

	moveDown () {
		if ( parseInt( this.snake[ 0 ].style.marginTop ) >= 490 ) {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginTop = '0px';
			this.snake[ 0 ].style.marginLeft = parseInt( this.snake[ 1 ].style.marginLeft ) + 'px';
		} else {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginTop = ( parseInt( this.snake[ 1 ].style.marginTop ) + 10 ) + 'px';
			this.snake[ 0 ].style.marginLeft = parseInt( this.snake[ 1 ].style.marginLeft ) + 'px';
		}

		this.eat();
	}

	moveUp () {
		if ( parseInt( this.snake[ 0 ].style.marginTop ) <= 0 ) {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginTop = '490px';
			this.snake[ 0 ].style.marginLeft = parseInt( this.snake[ 1 ].style.marginLeft ) + 'px';
		} else {
			let xx = this.snake[ this.snake.length - 1 ];
			this.snake.pop();
			this.snake.unshift( xx );
			this.snake[ 0 ].style.marginTop = ( parseInt( this.snake[ 1 ].style.marginTop ) - 10 ) + 'px';
			this.snake[ 0 ].style.marginLeft = parseInt( this.snake[ 1 ].style.marginLeft ) + 'px';
		}

		this.eat();
	}

	increaseSnake () {
		let e = document.createElement( "div" );

		e.classList.add( 'snake' );
		e.style.marginLeft = parseInt( this.snake[ this.snake.length - 1 ].style.marginLeft ) + 'px';
		e.style.marginTop = parseInt( this.snake[ this.snake.length - 1 ].style.marginTop ) + 'px';

		window.controler.campo.appendChild( e );
		this.snake.push( e );
	}

	eat () {
		var a = parseInt( this.snake[ 0 ].style.marginLeft ) - parseInt( controler.eat.eat.style.marginLeft );
		var b = parseInt( this.snake[ 0 ].style.marginTop ) - parseInt( controler.eat.eat.style.marginTop );

		if ( a < 7 && a > -7 && b < 7 && b > -7 ) {
			this.increaseSnake();

			window.controler.pontos += 1;
			window.controler.eat.alterLocation();
			window.controler.atualizar();
		}
	}
	
}

class Food {

	constructor() {
		this.eat = document.createElement( "div" );
		this.eat.classList.add( 'snake' );
		window.controler.campo.appendChild( this.eat );
	}

	// ALTERAR A POSICAO DA COMIDA NO CAMPO
	alterLocation () {
		let xx = Math.floor( Math.random() * 695 ) + 1;
		let yy = Math.floor( Math.random() * 495 ) + 1;

		this.eat.style.marginLeft = xx + 'px';
		this.eat.style.marginTop = yy + 'px';
	}

}

class Control {

	constructor() {
		this.pontos = 0;
		this.campo = document.getElementById( "campo" );
		this.localPontos = document.getElementById( "pts" );
		this.snake;
		this.eat;
		this.speed = 120;
		this.snakeInterval;
		this.direcaoAtual;
		this.nivel = 1;
		this.localNivel = document.getElementById( "nvl" );
	}

	inicializarComponentes () {
		this.snake = new Snake();
		this.eat = new Food();
		this.eat.alterLocation();
	}

	atualizar () {

		if ( this.pontos % 5 == 0 ) {
			this.speed -= 5;
			this.nivel += 1;
		}

		this.localPontos.innerText = this.pontos;
		this.localNivel.innerText = this.nivel;
	}

	keyHandler ( event ) {
		let t = event.which;

		// NAO EXECUTAR NADA AO SEREM PRESSIONADAS DIFERENTES DAS PERMITIDAS PARA CONTROLAR A SNAKE
		if ( t != 37 && t != 38 && t != 39 && t != 40 ) {
			return;
		}

		// NAO PERMITIR A MOVIMENTACAO PARA O DIRECAO CONTRARIA DA DIRACAO ATUAL
		if ( ( t == 39 && this.direcaoAtual == 37 ) ||
			( t == 37 && this.direcaoAtual == 39 ) ||
			( t == 38 && this.direcaoAtual == 40 ) ||
			( t == 40 && this.direcaoAtual == 38 ) ) {
			return
		}

		// VERIFICA SE A TECLA PRESSIONA E A DIRACAO ATUAL
		if ( this.direcaoAtual == t ) {
			return;
		}

		// LIMPAR O INTERVALO PARA PODER CRIAR UM NOVO
		clearInterval( this.snakeInterval );

		if ( t == 39 ) {
			this.snakeInterval = setInterval( function ( snake ) { snake.moveRight(); }, this.speed, this.snake );
		} else if ( t == 40 ) {
			this.snakeInterval = setInterval( function ( snake ) { snake.moveDown(); }, this.speed, this.snake );
		} else if ( t == 37 ) {
			this.snakeInterval = setInterval( function ( snake ) { snake.moveLeft(); }, this.speed, this.snake );
		} else if ( t == 38 ) {
			this.snakeInterval = setInterval( function ( snake ) { snake.moveUp(); }, this.speed, this.snake );
		}

		this.direcaoAtual = t;
	}

}

var controler = new Control();
controler.inicializarComponentes();

document.onkeydown = function( event ){
	controler.keyHandler( event );
}