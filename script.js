const nono = ["helium", "astatine", "cardinal", "amplitude modulation", "artium magister"]
const stop = ["a","able","about","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]

copy = document.getElementById("copy")
output = document.getElementById("output")
input = document.getElementById("input")
translateAgain = document.getElementById("translate-again")
copy.addEventListener("click", copyOutput)
translateAgain.addEventListener("click", translate)
new ClipboardJS('.copy');

input.addEventListener("keydown", (e) => {
	if (e.keyCode == 13) {
		generateOutput();
		e.preventDefault();
	}
})

function generateOutput() {
	output.value = ""
	copy.setAttribute("data-clipboard-text", "")
	inputStr = input.value
	inputStr.split(" ").forEach((element) => {
		var xmlHTTP = new XMLHttpRequest();
		var url = "https://api.datamuse.com/words?rel_syn=" + element
		xmlHTTP.open("GET", url, false);
		xmlHTTP.send();
		console.log(xmlHTTP.responseText)
		if (xmlHTTP.responseText == "[]") {
			output.value += element + " ";
			copy.setAttribute("data-clipboard-text", copy.getAttribute("data-clipboard-text") + element + " ")
		} else {
			process(JSON.parse(xmlHTTP.responseText), element)
		}
	})
}

function process(result, current) {
	var longest = "";
	console.log(result)
	for (key in result) {
		newWord = result[key].word
		console.log(newWord)
		if (newWord.length > longest.length && newWord.length > current.length && !(newWord.includes("atomic number")) && !(nono.includes(newWord)) && !(stop.includes(current))) {
			longest = newWord;
		}
	}
	if (longest != "") {
		output.value += longest + " ";
		copy.setAttribute("data-clipboard-text", copy.getAttribute("data-clipboard-text") + longest + " ")
	} else {
		output.value += current + " ";
		copy.setAttribute("data-clipboard-text", copy.getAttribute("data-clipboard-text") + current + " ")
	}
}

function copyOutput() {
	copy.removeEventListener("click", copyOutput)
	copy.innerHTML = "copied!";
	setTimeout(() => {
		copy.innerHTML = "copy";
		copy.addEventListener("click", copyOutput)
	},1000)
}

function translate() {
	translateAgain.removeEventListener("click", translate)
	input.value = output.value
	generateOutput()
	translateAgain.innerHTML = "braininated!";
	setTimeout(() => {
		translateAgain.innerHTML = "braininate again";
		translateAgain.addEventListener("click", translate)
	},1000)
}
