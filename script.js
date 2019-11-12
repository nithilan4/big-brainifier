const nono = ["helium", "astatine", "cardinal", "amplitude modulation", "artium magister"]
copy = document.getElementById("copy")
output = document.getElementById("output")
input = document.getElementById("input")
translateAgain = document.getElementById("translate-again")
copy.addEventListener("click", copyOutput)
translateAgain.addEventListener("click", translate)
new ClipboardJS('.copy');

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
		if (newWord.length > longest.length && newWord.length > current.length && !(newWord.includes("atomic number")) && !(nono.includes(newWord))) {
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