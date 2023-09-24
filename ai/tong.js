const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

var script = document.createElement("script");
script.src = "https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js";
document.head.appendChild(script);


script.onload = function() {
  var typed = new Typed("#typing", {
    strings: ["Made by Unknown Leaf"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });
};

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning Boss");
    }

    else if(hr == 12) {
        speak("Good noon Boss");
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon Boss");
    }

    else {
        speak("Good Evening Boss");
    }
}

window.addEventListener('load', ()=>{
    speak("Activating Tong", () => {
        speak("Going online", () => {
            wishMe();
        })
    })
})
let shoudRestart = true
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function setTimer(hours, minutes, seconds) {
    // Convert hours, minutes, and seconds to milliseconds
    let milliseconds = ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;

    // Set the timer
    setTimeout(() => {
        speak('Your timer is up.');
    }, milliseconds);

    // Confirm to the user that the timer has been set
    speak(`Timer set for ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
}

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    let shoudRestart = true;

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello Boss";
        speech.text = finalText;
    }



    else if(message.includes('set a reminder')) {
        let reminderTime;
        if(message.includes('for')) {
            // The user wants to set a reminder for a specific time.
            reminderTime = message.split('for')[1].trim();
            // Convert the given time to 24 hours format.
            if (reminderTime.includes(':')){            
                let [hour, minutes] = reminderTime.split(':');
                reminderTime = `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
                // Calculate the time difference in milliseconds.
                let now = new Date();
                let reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes);
                if(reminderDate < now ) {
                    reminderDate.setDate(reminderDate.getDate() + 1)
                }
                let diff = reminderDate.getTime() - now.getTime();
                // Set the reminder.
                setTimeout(() => {
                    speak('Your reminder is due now.');
                }, diff);
            }
        } else if(message.includes('in')) {
            // The user wants to set a reminder for a certain duration from now.
            let duration = parseInt(message.split('in')[1].trim());
            // Set the reminder.
            setTimeout(() => {
                speak('Your reminder is due now.');
            }, duration * 60 * 1000); // Convert minutes to milliseconds.
        }
        const finalText = "Reminder set for" + reminderTime
        speech.text = finalText
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine boss tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('name')) {
        const finalText = "My name is Tong";
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('what is the time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else if(message.includes('music')) {
        window.open('https://music.youtube.com')
        const finalText = "Opening youtube music"
        speech.text = finalText;
    }

    else if(message.includes('youtube')) {
        window.open('https://youtube.com')
        const finalText = 'Opening youtube'
        speech.text = finalText
    }

    else if(message.includes('gmail') || message.includes('email')) {
        window.open('https://gmail.com')
        const finalText = 'Opening your email'
        speech.text = finalText
    }

    else if(message.includes('documents')) {
        window.open('https://devdocs.io');
        const finalText = 'Opening developer documents'
        speech.text = finalText
    }

    else if(message.includes('project')) {
        window.open('https://replit.com/new')
        const finalText = 'Opening your code space. What is it for?'
        speech.text = finalText
    }

    else if(message.includes('summer playlist')) {
        window.open("https://music.youtube.com/watch?v=ER0SNDsUDDE&list=LRSRa27Cy45vbn2Q7E-kNrRBpxzYzGDcNf_eX")
        const finalText = 'Opening your summer plalist on youtube music'
        speech.text = finalText
    }

    else if(message.includes('shutdown') || message.includes('shut down')) {
        const finalText = 'Shutting down. Please close the tab'
        speech.text = finalText
        shoudRestart = false;
        recognition.stop();
        btn.disabled = true;
        document.querySelector('.talk').disabled = true;
    }

    else if (message.includes('open amazon')) {
        window.open('https://amazon.in') 
        const finalText = 'Opening amazon'
        speech.text = finalText
    }

    else if(message.includes('set a timer for')) {
        // The user wants to set a timer.
        let hours = 0, minutes = 0, seconds = 0;
    
        // Check if the message includes hours, minutes, and seconds and extract the values
        if (message.includes('hour')) {
            let match = message.match(/(\d+)\s*hour/);
            if (match) {
                hours = parseInt(match[1]);
            }
        }
        
        if (message.includes('minute')) {
            let match = message.match(/(\d+)\s*minute/);
            if (match) {
                minutes = parseInt(match[1]);
            }
        }
        
        if (message.includes('second')) {
            let match = message.match(/(\d+)\s*second/);
            if (match) {
                seconds = parseInt(match[1]);
            }
        }
    
        // Call the setTimer function with the extracted values
        
            setTimer(hours, minutes, seconds)
        

        return;
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    speech.onend = function(event) {
        if (shoudRestart) {
            recognition.start();
        }
    }

    window.speechSynthesis.speak(speech);
};


