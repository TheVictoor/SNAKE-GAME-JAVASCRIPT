
// AUTHOR - JOAO VICTOR      
// DATE   - 14-11-2017   

// Seta para Esquerda: 37
//     Seta para Cima: 38
//  Seta para Direita: 39
//    Seta para Baixo: 40

// METODOS DE ARRAY
// UNSHIFT
// SHIFT
// POP

// APENAS APOS O CARREGAMENTO DA PAGINA
window.onload = function(){
	// VARIAVEIS GLOBAIS
	var _body = document.body
	var _campo = document.getElementById("campo");
	var _ponto =  document.createElement("div");
	var snake;
	var arraySnake = [];
	var x , y;
	x = 150;
	y = 150;

	_ponto.classList.add('snake');
	_campo.appendChild(_ponto);
	changeLocationPonto();

	// CLASSE PARA A SNAKE
	function snakeClass(array , speed, p){
		this.elementos = array;
		this.direcaoAtual;
		this.intervalSnake;
		this.speed = speed;
		this.pontos = p;
		this.nivel = 1;
	}

	// MOVIMENTAÇÃO DA SNAKE E VERIFICAÇÃO DA POSICAO DO PONTO
	function setSnake(snake, dir){
		if(dir == 1){
			if(parseInt(snake.elementos[0].style.marginLeft) >= 690 ){
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginLeft = 0 + 'px';
				snake.elementos[0].style.marginTop = parseInt(snake.elementos[1].style.marginTop) + 'px';				
			}else{
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginLeft = (parseInt(snake.elementos[1].style.marginLeft) + 10) + 'px';
				snake.elementos[0].style.marginTop = parseInt(snake.elementos[1].style.marginTop) + 'px';
			}

		}else if(dir == 2){
			if(parseInt(snake.elementos[0].style.marginTop) >= 490 ){
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginTop ='0px';
				snake.elementos[0].style.marginLeft = parseInt(snake.elementos[1].style.marginLeft) + 'px';
			}else{
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginTop = (parseInt(snake.elementos[1].style.marginTop) + 10) + 'px';
				snake.elementos[0].style.marginLeft = parseInt(snake.elementos[1].style.marginLeft) + 'px';
			}

		}else if(dir == 3){
			if(parseInt(snake.elementos[0].style.marginLeft) <= 0){
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginLeft ='690px';
				snake.elementos[0].style.marginTop = parseInt(snake.elementos[1].style.marginTop) + 'px';
			}else {
				var xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginLeft = (parseInt(snake.elementos[1].style.marginLeft) - 10) + 'px';
				snake.elementos[0].style.marginTop = parseInt(snake.elementos[1].style.marginTop) + 'px';
			}

		}else if(dir == 4){
			if(parseInt(snake.elementos[0].style.marginTop) <= 0 ){
				xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginTop = '490px';
				snake.elementos[0].style.marginLeft = parseInt(snake.elementos[1].style.marginLeft) + 'px';
			}else{
				xx = snake.elementos[snake.elementos.length - 1];
				snake.elementos.pop();
				snake.elementos.unshift(xx);
				snake.elementos[0].style.marginTop = (parseInt(snake.elementos[1].style.marginTop) - 10) + 'px';
				snake.elementos[0].style.marginLeft = parseInt(snake.elementos[1].style.marginLeft) + 'px';
			}

		}

		//
		// VERIFICAR A DISTANCIA DA COBRINHA PARA O PONTO
		//
		 
		var a = parseInt(snake.elementos[0].style.marginLeft) - parseInt(_ponto.style.marginLeft);
		var b = parseInt(snake.elementos[0].style.marginTop) - parseInt(_ponto.style.marginTop);

		if(a < 7 && a > -7 && b < 7 && b > -7 ){
			
			var e = document.createElement("div");
			e.classList.add('snake');
			e.style.marginLeft = parseInt(snake.elementos[snake.elementos.length - 1].style.marginLeft) + 'px';
			e.style.marginTop  = parseInt(snake.elementos[snake.elementos.length - 1].style.marginTop) + 'px';
			_campo.appendChild(e);

			snake.elementos.push(e);

			changeLocationPonto();

			snake.pontos += 1;

			document.getElementById("pts").innerText = snake.pontos;

			if(snake.pontos % 5 == 0){
				snake.speed -= 5;
				snake.nivel += 1
				document.getElementById("nvl").innerText = snake.nivel;
			}
		}

		snake.direcaoAtual =  dir;
	}

	// ALTERA A POSIÇÃO DO PONTO
	function changeLocationPonto(){
		var xx = Math.floor(Math.random() * 695) + 1;
		var yy = Math.floor(Math.random() * 495) + 1;

		_ponto.style.marginLeft = xx + 'px';
		_ponto.style.marginTop = yy + 'px';
	}

	// FUNÇÃO PARA INICIALIZAR A UM ARRAY DE SNAKE
	for(var i = 0; i < 10; i++){	
		var elt1 = document.createElement("div");
		elt1.classList.add('snake');
		
		elt1.style.marginLeft = x + 'px';
		elt1.style.marginTop = 0 + 'px';
		x -= 10;

		_campo.appendChild(elt1);
		arraySnake.push(elt1);
	}
	
	// CRIA UM OBJ DO TIPO SNAKE
	var snake = new snakeClass(arraySnake , 100 , 0);

	document.onkeydown = function(){
		var t = event.which;
		var d = snake.direcaoAtual;

		if(t != 37 && t != 38 && t != 39 && t != 40){
			return;
		}

		if((t == 39 && d == 3) || (d == 1 && t == 37) || (d == 2 && t == 38) || (d == 4 && t == 40) ){
			return;
		}

		clearInterval(snake.intervalSnake);

		if(t == 39){
			snake.intervalSnake = setInterval(setSnake , snake.speed , snake, 1);
		}else if( t == 40){
			snake.intervalSnake = setInterval(setSnake , snake.speed , snake, 2);
		}else if(t == 37){
			snake.intervalSnake = setInterval(setSnake , snake.speed , snake, 3);
		}else if(t == 38){
			snake.intervalSnake = setInterval(setSnake , snake.speed , snake, 4);
		}		
	};
};
