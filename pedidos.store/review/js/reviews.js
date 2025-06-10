var pagina = 0;
var offset = 0;

window.addEventListener("load", function(event) {
	
	//ZERAR O DIV
	document.getElementsByClassName("message_box")[0].innerHTML = "";

	//ADICIONAR ESTRUTURA DA AVALIACAO
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
		document.getElementsByClassName("message_box")[0].innerHTML = "<span id=\"anumero\">0</span> Avaliações de clientes recebidas.<br>Média: <span class=\"rating display-inline\" id=\"mediaestrelas\"></span><span id=\"medianumero\"></span>";
	} else {
		document.getElementsByClassName("message_box")[0].innerHTML = "<span id=\"anumero\">0</span> Avaliações de clientes recebidas. Média: <span class=\"rating display-inline\" id=\"mediaestrelas\"></span><span id=\"medianumero\"></span>";
	}

	//CHAMA OS COMENTARIOS INICIAIS
	clickFunc();

});

function requisitarComentario(codproduto, pagina, quantitens, avatar){
    var xmlhttp = new XMLHttpRequest();
    //URL QUE RETORNA O JSON
    var url = "https://pedidos.store/reviews/get/?_product=" + codproduto + "&_offset=" + quantitens;
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //tipo, avatar, nome, tempo, comentario
            var myArr = JSON.parse(this.responseText);
            adicionarComentarios(myArr, avatar);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//CLICK DO BOTAO AZUL
function clickFunc(){
    //SEMPRE QUE CLICA AUMENTA UMA PAGINA
    pagina++;
	if(pagina > 1) {
		offset = offset + 10;
	}

    //@PARAM CODIGO DO PRODUTO, NUMERO DA PAGINA, QUANTOS ITENS DESEJA
    requisitarComentario(codproduto, pagina, offset, avatar);
}

///////////////////
//NAO EDITAR ABAIXO
///////////////////

function adicionarComentarios(myArr, avatar){

	var listaComentarios = document.getElementById('load_testm_div');
	
	if(myArr.avaliacoes != null && myArr.avaliacoes.length > 0) {
			
		var contagem = document.getElementById("anumero");
		contagem.innerHTML = "";
		contagem.innerHTML = ""+myArr.total+"";
	
		var medianumero = 4.5;
		document.getElementById("medianumero").innerHTML = "("+medianumero+")";

		var mediaestrela = document.getElementById("mediaestrelas");
		var estrelas = "";
		//var resto = (myArr.media % 1).toFixed(2);
		var resto = 0.05;
		var diferenca = myArr.media - resto;

		for (var i = 0; i < 4; i++) {
			estrelas += '<i class="icon-star-5"></i>';
		}

		//SEMPRE QUE TIVER DECIMAL ADICIONA MEIA ESTRELA
		if(resto > 0.01){
			estrelas += '<i class="icon-star-5 half"></i>';
		}

		mediaestrela.innerHTML = "";
		mediaestrela.innerHTML = estrelas;

		myArr.avaliacoes.forEach(function(comentario) {

			if(avatar == 1) {
				var html = ''
				+'<div class="comentario">'
				+'<div class="display-flex">'
				+'<div class="bloco-avatar">'
				+'<div class="avatar text-center">'
				+'<img src="' + comentario.avatar + '">'
				+'<b>' + comentario.name + '</b>'
				+'</div>'
				+'<div class="verificado text-center"><i class="icon-ok-circle-1"></i><span>Compra Verificada</span></div>'
				+'</div>'
				+'<div class="bloco-texto">'
				+'<div>'
				+'<div class="rating display-inline">';
				
				for (var i = 0; i < comentario.rating; i++) {
					html += '<i class="icon-star-5"></i>';
				}

				html += '</div>'
				+'<div class="time display-inline">'
				+'<span><i class="icon-clock"></i>' + comentario.relative_time + '</span>'
				+'</div>'
				+'</div>'
				+'<div class="texto">'
				+'<p>' + comentario.comment + '</p>'
				+'</div>'
				+'<div class="recomendar"><i class="icon-thumbs-up"></i><span>Sim, recomendaria este produto a um amigo.</span></div>';
				if(comentario.images !== null) {
					html += '<div class="galeria">';
						var imgs = JSON.parse(comentario.images);
						imgs.forEach(function(img) {
							html += '<img src="https://pedidos.store/'+img.image_thumb+'" />';
						});
					html += '</div>';
				}
				html += '</div>'
				+'</div>'
				+'</div>';
			} else {
				var html = ''
				+'<div class="comentario">'
				+'	<div class="display-flex">'
				+' 		<div class="bloco-avatar no-avatar">'
				+'			<div class="number text-center">' + comentario.rating + '</div>'
				+'			<div class="avatar text-center">'
				+'				<div class="rating display-inline">';
				
									for (var i = 0; i < comentario.rating; i++) {
										html += '<i class="icon-star-5"></i>';
									}

				html += '		</div>'
								+'<b>' + comentario.name + '</b>'
							+'</div>'
							+'<div class="verificado text-center"><i class="icon-ok-circle-1"></i><span>Compra Verificada</span></div>'
							+'<div class="time text-center">'
								+'<span><i class="icon-clock"></i>' + comentario.relative_time + '</span>'
							+'</div>'
						+'</div>'
				+'		<div class="bloco-texto">'
							+'<div class="texto">'
								+'<p>' + comentario.comment + '</p>'
							+'</div>'
							+'<div class="recomendar"><i class="icon-thumbs-up"></i><span>Sim, recomendaria este produto a um amigo.</span></div>';
							if(comentario.images !== null) {
								html += '<div class="galeria">';
									var imgs = JSON.parse(comentario.images);
									imgs.forEach(function(img) {
										html += '<img src="https://pedidos.store/'+img.image_thumb+'" />';
									});
								html += '</div>';
							}
							html += '</div>'
						+'</div>'
					+'</div>'
				+'</div>';
			}
			listaComentarios.insertAdjacentHTML('beforeend',html);

		});
		
	} else {
		document.getElementById("load_testm_button").style.display = "none";
	}

}
