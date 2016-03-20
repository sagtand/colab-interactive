//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().toMaster(); // Create a synth
var main = document.querySelector('#main'); // The notes canvas
var notes = document.querySelector('.notes'); // The notes canvas

var scale = ['C2', 'D2', 'E2', 'G2', 'A2']; //C penta

var newRandomTone;
var playedTones = [];
function randomTone(){
	return scale[Math.floor(Math.random() * scale.length)];
}
newRandomTone = randomTone();

// listen to events...
var mc = new Hammer(main);
mc.on("panleft panright tap press", function(ev) {
    //main.textContent = ev.type +" gesture detected.";

    //Play the synth
	newRandomTone = randomTone();
	playedTones.push(newRandomTone);
	// console.log(playedTones);
	synth.triggerAttackRelease(newRandomTone, '2n');
	
	//Write the latest tone to the DOM
	var newtone = document.createElement('span');
	var latestTone = playedTones[ playedTones.length -1 ]
	newtone.innerHTML= '<span class="note note--'+ latestTone +'">' + latestTone + '</span>';
	notes.appendChild(newtone.firstChild)
	
});


//play a note every quarter-note
// var loop = new Tone.Loop(function(time){
//     synth.triggerAttackRelease(newRandomTone, "8n", time);
// }, "4n");

// Tone.Transport.start();
// loop.start("0").stop("4m");

//loop between the first and fourth measures of the Transport's timeline

