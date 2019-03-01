// JavaScript source code
var commands = [
	{
		command:"!!soundcloud",
		url:"https://soundcloud.com/stream"
	},
	{
		command:"!!spotify",
		url:"https://open.spotify.com/browse"
	},
	{
		command:"!!local:8000",
		url:"http://localhost:8000"
	},
	{
		command:"!!local8080",
		url:"http://localhost:8080"
	},
	{
		command:"!!calc",
		url:"http://web2.0calc.com/"
	},
	{
		command:"!!keep",
		url:"https://keep.google.com/u/0/#home"
	},
	{
		command:"!!gt",
		url:"https://translate.google.com/"
	},
	{
		command:"!!dt",
		url:"https://www.deepl.com/translate"
	},
	{
		command:"!!mal",
		url:"https://myanimelist.net/"
	},
	{
		command:"!!anilist",
		url:"http://myanimelist.net/"
	},
	{
        command:"!!campus",
        url:"http://campusvirtual.ufro.cl"
        },
	{
		command:"!!intranet",
		url:"https://intranet.ufro.cl/"
	},	
]

commands.sort((a,b)=>{
	return a.command.localeCompare(b.command);
})

var searchBox = $('#search');
var datalist = $('#commands');

for(i = 0; i < commands.length; i++){
	var option = $('<option></option>').attr('value',commands[i].command);
	$(datalist).append($(option));
}

searchBox.onkeypress = function (e) {
	if (!e) e = window.event;
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13') {
		var url = findUrl(search.value);
		if(url){
			window.location.href = url;
		} else if ($(search.value).startsWith('!')){
			window.location.href = "https://duckduckgo.com/?q=" + search.value;
		} else {
			window.location.href = "https://www.google.com/search?q=" + search.value;
		}
	}
};

function findUrl(command){
	for(i = 0; i < shortcut.length; i++){
		if(shortcut[i].command === command){
			return shortcut[i].url;
		}
	}
	return 0;
}