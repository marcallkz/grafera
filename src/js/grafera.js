String.prototype.upperCaseFirst = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);   
}

var datasetFields = (function()
{
	var index = 1,
	    colorFields = function()
	    {
		    var div = document.createElement("div"),
		        label = document.createElement("label"),
		        color = null;

		    if (Modernizr.inputtypes.color)
		    {
			    color = document.createElement("input");
			    color.type = "color";
			    color.classList.add("input");
			    color.id = "colorpicker-" + index;
			    color.classList.add("input");
		    }
		    else
		    {
			    color = document.createElement("label");
			    color.textContent = "Sem cores";
		    }

		    label.textContent = "Cor";
		    label.setAttribute("for","colorpicker-" + index);
		    label.classList.add("label");

		    div.appendChild(label);
		    div.appendChild(color);

		    return div;
	    },
	    newFields = function(pLabel, pPlaceholder, pType, pName)
	    {
		    var div = document.createElement("div"),
		        label = document.createElement("label"),
		        input = document.createElement("input");

		    input.type = pType;
		    input.placeholder = pPlaceholder;
		    input.id = pName + "-" + index;
		    input.classList.add("input");

		    label.setAttribute("for", input.id);
		    label.textContent = pLabel;
		    label.classList.add("label");

		    div.appendChild(label);
		    div.appendChild(input);

		    return div;
	    };

	    return function()
	    {
	    	var section = document.createElement("section"),
	    	    close = document.createElement("span");

	    	close.classList.add("dataset-remove");
	    	close.classList.add("close");
	    	close.textContent = "X";
	    	close.title = "remover";

	    	section.classList.add("dataset");
	    	section.appendChild(close);
	    	section.appendChild(newFields("Nome", "ex: Lucros", "text", "name"));
	    	section.appendChild(newFields("Valor", "ex: 140", "number", "value"));
	    	section.appendChild(colorFields());
	    	index++;
	    	return section;
	    }
})();

window.onload = function()
{
	var chartData = 
	    {
		    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
		    datasets: [{
			    label: "Cinza",
			    fillColor: "rgba(220,220,220,0.5)",
			    strokeColor: "rgba(220,220,220,0.8)",
			    highlightFill: "rgba(220,220,220,0.75)",
			    highlightStroke: "rgba(220,220,220,1)",
			    data: [33, 57, 80, 81, 56, 55, 40]
		    },
		    {
			    label: "Azul",
			    fillColor: "rgba(151,187,205,0.5)",
			    strokeColor: "rgba(151,187,205,0.8)",
			    highlightFill: "rgba(151,187,205,0.75)",
			    highlightStroke: "rgba(151,187,205,1)",
			    data: [28, 13, 40, 19, 86, 27, 90]
		    }]},
	    pieData = [{
		    value: 230,
		    color:"#F7464A",
		    highlight: "#FF5A5E",
		    label: "Vermelho"
	    },
	    {
		    value: 64,
		    color: "#46BFBD",
		    highlight: "#5AD3D1",
		    label: "Verde"
	    },
	    {
		    value: 92,
		    color: "#FDB45C",
		    highlight: "#FFC870",
		    label: "Amarelo"
	    }],
	    ctx = document.querySelector(".js-graph").getContext("2d"),
	    chart = new Chart(ctx).Bar(chartData, {}),
	    defaultData = null;

	document.querySelector(".js-graph-dataset").appendChild(datasetFields());
	document.querySelector(".js-graph-dataset").appendChild(datasetFields());

	document.querySelector(".js-edit").addEventListener("click", function()
	{
		document.querySelector(".js-modal").classList.add("is-visible");
	});

	document.body.addEventListener("click", function(pEvt)
	{
		if (pEvt.target.classList.contains("dataset-remove"))
		{
			pEvt.target.parentElement.parentElement.removeChild(pEvt.target.parentElement);
			return;
		}
		
		if (pEvt.target.classList.contains("js-modal-close"))
		{
			document.querySelector(".js-modal").classList.remove("is-visible");
			return;
		}

		if (pEvt.target.classList.contains("js-add"))
		{
			document.querySelector(".js-graph-dataset").appendChild(datasetFields())
			return;
		}

		if (pEvt.target.classList.contains("js-chart"))
		{
			if (pEvt.target.classList.contains("active-chart"))
				return;

			if (confirm("Mudar o tipo de gráfico vai apagar seus dados. Mudar mesmo assim?"))
			{
				document.querySelector(".active-chart").classList.remove("active-chart");
				pEvt.target.classList.add("active-chart");
				defaultData = pEvt.target.getAttribute("data-chart") === "pie" ? pieData : chartData
				chart = new Chart(ctx)[pEvt.target.getAttribute("data-chart").upperCaseFirst()](defaultData, {});
			}
			return;
		}
	});
}