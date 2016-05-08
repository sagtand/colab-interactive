//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().toMaster(); // Create a synth
var main = document.querySelector('#main'); // The notes canvas
var notes = document.querySelector('.notes'); // The notes canvas

var scale = [65.40, 73.41, 82.40, 97.99, 110.0]; //C penta (C2, D2, E2, G2, A2)
scaleTones = scale.length;

var RandomToneModulation = 100;
var playedTones = []; //global array for played tones

function randomTone(){
	return Math.floor(Math.random() * scale.length);
}
newRandomTone = randomTone();


function playRandomTone(tone) {
    //Play the synth
	playedTones.push(tone)
	synth.triggerAttackRelease(tone, '2n');
	RandomToneModulation = tone;
	console.log(RandomToneModulation);
	//Write the latest tone to the DOM
	var newtone = document.createElement('span');
	var latestTone = playedTones[ playedTones.length -1 ];
	
	//take the latest tone, convert to string and replace the decimal with nothing to be used in css
	// newtone.innerHTML= '<span class="note note--'+ latestTone.toString().replace(/\./g, '') +'">' + latestTone + '</span>';
	// notes.appendChild(newtone.firstChild)

	//scroll down
	window.scrollTo(0,document.body.scrollHeight);
}

function modulateRandomTone(tone) {
	RandomToneModulation = RandomToneModulation + tone;
	console.log(RandomToneModulation);
	synth.triggerAttackRelease(RandomToneModulation, '2n');

}




// tone on pan

// mc.on("panright", function(ev) {
//     modulateRandomTone(1);
// });
// mc.on("panleft", function(ev) {
//     modulateRandomTone(-1);
// });


//play a note every quarter-note
// var loop = new Tone.Loop(function(time){
//     synth.triggerAttackRelease(newRandomTone, "8n", time);
// }, "4n");

// Tone.Transport.start();
// loop.start("0").stop("4m");

//loop between the first and fourth measures of the Transport's timeline

