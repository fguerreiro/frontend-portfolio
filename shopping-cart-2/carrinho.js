var alternaPropagandas = function() {
	$('.propaganda').fadeToggle();
	$(".alterna-propaganda").fadeToggle();

}

var darDestaque = function() { 
	$(this).find(".remove-item").fadeIn();
	$(this).addClass('hovering');
};

var tirarDestaque = function() { 
	$(this).find(".remove-item").fadeOut();
	$(this).removeClass('hovering');
};

var umaPropaganda = function () {
	var propagandas = ["Sleepy? Try the new expresso from Brülerie Saint-Denis!",
		"Hungry ? Try the new double chocolate donuts from Tim Hortons!",
		"Earn money from home!",
		"Try the new fitness classes from Zumba - YMCA!"];

	var posicao = Math.floor(propagandas.length * Math.random());
	var texto = propagandas[posicao];
	var tr = $("<tr>").append($('<td>'));
	
	var div_primary =  $("<div>").addClass('panel panel-info');
	var div_heading = $("<div>").addClass('text-center panel-heading').text('Sponsors');
	var div_body = $("<div>").addClass('text-center panel-body').text(texto);
	
	var div = div_primary.addClass('propaganda').append(div_heading).append(div_body).css({'padding':'0px'});
	tr.find("td").append(div);
	tr.find("td").attr("colspan", 6);
	
	return tr;
}

var atualizaDados = function () {

	var carrinhos = $('.carrinho');

	carrinhos.each(function () {
		var carrinho = $(this);
		var items = carrinho.find(".item-total:visible");
		var total = 0;
		for (var i = 0; i < items.length; i++) {
			var item = $(items[i]); // valor é um td
			var valor = parseFloat(item.text());
			total = total + valor;
		}
		carrinho.find('.valor-total').text(total);
		carrinho.find('.quantidadeItems').text(items.length);
	});
}

var aposInicializado = function () {
	atualizaDados();
	$('.undoBtn').click(undo);
	$('.remove-item').click(removerItem);
	
	$(".carrinho").each(function() {
		$(this).find('tr:nth-child(3n),tr:last').each(function () {
			var divToInsert = umaPropaganda();
			
			divToInsert.insertAfter($(this));
			
		});
	});
	
	$('.carrinho tbody tr').hover(darDestaque, tirarDestaque);
	$('.alterna-propaganda').click(alternaPropagandas);
};

var removerItem = function (event) {
	event.preventDefault();

	$(this).closest("tr").hide();

	atualizaDados();
}

var undo = function () {
	var carrinho = $(this).closest('.carrinho');
	carrinho.find('tr:visible').removeClass('.recuperado');

	var trs = carrinho.find('tr:hidden');
	trs.addClass('recuperado').show();

	atualizaDados();
};

$(aposInicializado);