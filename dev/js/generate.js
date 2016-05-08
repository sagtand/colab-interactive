//create one of Tone's built-in synthesizers and connect it to the master output


var crusher = new Tone.BitCrusher(5).toMaster();
// var synth = new Tone.MonoSynth().connect(crusher);

var synth = new Tone.SimpleSynth({
	oscillator:{
		type:"sine",
		// partials: [1, 0.4, 0.02]
	},
	envelope:{
		attack:0.005,
		decay:0.1,
		sustain:0.3,
		release:4
	}
}).connect(crusher); // Create a synth

var synth_bg = new Tone.SimpleSynth({
	oscillator:{
		type:"sine",
		// partials: [1, 0.4, 0.02]
	},
	envelope:{
		attack:0.005,
		decay:0.1,
		sustain:0.3,
		release:4
	}
}).toMaster(); // Create a synth

			
// var synth = new Tone.SimpleFM({
// 	"modulationIndex" : 12.22,
// 	"carrier" : {
// 		"envelope" : {
// 			"attack" : 0.01,
// 			"decay" : 0.2
// 		}
// 	},
// 	"modulator" : {
// 		"oscillator" : {
// 			"type" : "square"
// 		},
// 		"envelope" : {
// 			"attack" : 0.2,
// 			"decay" : 0.01
// 		}
// 	}
// }).toMaster();


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
	playedTones.push(tone);
	synth.triggerAttackRelease(tone, '4n');
	synth_bg.triggerAttackRelease(tone, '1n');

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



// BASS
//C2, D2, E2, G2, A2

var bassPart = new Tone.Part(function(time, event){
	if (Math.random() < event.prob){
		synth_bg.triggerAttackRelease(event.note, event.dur, time);
	}
},[ {time : "0:0", 			note : "A1", dur : "1n", 		prob: 1}, 
	{time : "0:4", 			note : "C2", dur : "1n", 		prob : 0.6}, 
	// {time : "0:2 + 4t", 	note : "A2", dur : "8n", 		prob : 0.4},
	// {time : "0:2 + 4t*2", 	note : "C2", dur : "8n", 		prob : 0.9},
	// {time : "1:0", 			note : "C2", dur : "4n + 8n", 	prob : 1},
	// {time : "1:2", 			note : "E2", dur : "8n", 		prob : 0.6}, 
	// {time : "1:2 + 4t", 	note : "A2", dur : "8n", 		prob : 0.4},
	// {time : "1:2 + 4t*2", 	note : "E2", dur : "8n", 		prob : 0.9},
	// {time : "2:0", 			note : "G2", dur : "4n + 8n", 	prob : 1},
	// {time : "2:2", 			note : "G2", dur : "8n", 		prob : 0.6}, 
	// {time : "2:2 + 4t", 	note : "G2", dur : "8n", 		prob : 0.4},
	// {time : "2:2 + 4t*2", 	note : "G2", dur : "8n", 		prob : 0.9},
	// {time : "3:0", 			note : "G2", dur : "4n + 8n", 	prob : 1},
	// {time : "3:2", 			note : "D2", dur : "8n", 		prob : 0.6}, 
	// {time : "3:2 + 4t", 	note : "G2", dur : "8n", 		prob : 0.4},
	// {time : "3:2 + 4t*2", 	note : "A2", dur : "8n", 		prob : 0.9}
]).start(0);

bassPart.loop = true;
bassPart.loopEnd = "2m";

Tone.Transport.bpm.value = 125;

Tone.Transport.start();
