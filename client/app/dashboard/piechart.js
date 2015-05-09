//var pie = new d3pie("pieChart", );
//
var pieColors = ["#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99","#ae83d5","#bf273e","#ce2aeb","#bca44a","#618d1b","#1ee67b","#b0ec44","#a4a0c9","#322849","#86f71a","#d1c87f","#7d9058","#44b9b0","#7c37c0","#cc9fb1","#e65414","#8b6834","#248838"];

var pieConfig = {
	"header": {
		"title": {
			"text": "Asset Allocation",
			"fontSize": 24,
			"font": "sans-serif"
		}
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "sans-serif",
		"location": "bottom-left"
	},
	"size": {
		"canvasHeight": 400,
		"canvasWidth": 500,
		"pieInnerRadius": "20%",
		"pieOuterRadius": "70%"
	},
	"data": {
		"sortOrder": "value-desc",
		"smallSegmentGrouping": {
			"enabled": true,
			"value": 2
		},
		"content": [
			{
				"label": "FoxPro",
				"value": 32170,
				"color": "#248838"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3,
			"fontSize": 18
		},
		"mainLabel": {
			"fontSize":12
		},
		"percentage": {
			"color": "#ffffff",
			"fontSize": 12,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 12
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {value}, {percentage}%"
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 16
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 60
		}
	}
};