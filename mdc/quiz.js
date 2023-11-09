//Display submitted name of user
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("name");
document.getElementById("name").innerText = username.split(" ")[0];

const randomizedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

let currentQuestion = 1;
const questionsAttempted = [];

const questionsElement = document.getElementById("questions");

//Add random questions to the page using JS
for (let i = 1; i <= randomizedQuestions.length; i++) {
	questionsElement.innerHTML += `
                    <section id="question-${i}" ${i === 1 ? "" : 'style="display:none;"'}>
                        <p><span id="question-number">Q.${i}</span>&nbsp;<span id="question">${randomizedQuestions[i - 1].question}</span>
                        </p>
                        <div id="options">
                        ${randomizedQuestions[i - 1].options
							.map(
								(o) => `
                        <input type="radio" name="option-${i}" id="option-${i}" value="${o.text}" class="radio-${i}"/>
                        <label for="option-${i}" id="option1-label" class="option-${i}">${o.text}</label><br>
                        `
							)
							.join("")}
                        </div>
                    </section>
                    `;
}

function prevQuestion() {
	document.getElementById("question-" + currentQuestion).style.display = "none";
	currentQuestion--;
	document.getElementById("question-" + currentQuestion).style.display = "unset";
	document.getElementById("prev")[currentQuestion === 1 ? "setAttribute" : "removeAttribute"]("disabled", "");
	document.getElementById("next")[currentQuestion === randomizedQuestions.length ? "setAttribute" : "removeAttribute"]("disabled", "");
}

function nextQuestion() {
	//Check if current option is selected
	if (!document.getElementById("quiz").elements["option-" + currentQuestion].value) return alert("Please select an option first before proceeding to the next question!");
	document.getElementById("question-" + currentQuestion).style.display = "none";
	currentQuestion++;
	document.getElementById("question-" + currentQuestion).style.display = "unset";
	document.getElementById("prev")[currentQuestion === 1 ? "setAttribute" : "removeAttribute"]("disabled", "");
	document.getElementById("next")[currentQuestion === randomizedQuestions.length ? "setAttribute" : "removeAttribute"]("disabled", "");

	//show the submit button
	if (currentQuestion === randomizedQuestions.length) document.getElementById("submit").style.display = "unset";
}

function quizSubmit() {
	//Check if all questions are answered
	if (document.querySelectorAll("input[type=radio][checked=true]").length !== randomizedQuestions.length) return alert("Please answer all questions before submitting!");

	document.getElementById("submit").style.display = "none";
	document.getElementById("prev").style.display = "none";
	document.getElementById("next").style.display = "none";
	//Show all questions
	for (let i = 1; i <= randomizedQuestions.length; i++) {
		document.getElementById("question-" + i).style.display = "unset";
	}

	let score = 0;

	//Disable all checkboxes
	document.querySelectorAll("input[type=radio]").forEach((r) => r.setAttribute("disabled", ""));

	//Loop through the questions and check answers
	randomizedQuestions.forEach((q, qi) => {
		q.options.find((v, i) => {
			if (v.correct) {
				//Highlight with green color
				document.querySelectorAll(".option-" + (qi + 1))[i].style.color = "green";
				//Check points for each question
				if (document.querySelectorAll(".radio-" + (qi + 1))[i].checked === true) score++;
			}
		});
	});

	//Make the submission details visible
	document.getElementById("submitted-details").style.display = "unset";
	const details = document.getElementById("details");
	details.innerHTML = "";

	const data = {
		prn: urlParams.get("prn"),
		name: urlParams.get("name"),
		email: urlParams.get("email"),
		institute: urlParams.get("institute"),
		mdc: urlParams.get("mdc"),
		score
	};

	for (const key in data) {
		details.innerHTML += `<li><p>${key}: ${data[key]}</p></li>`;
	}

	const alertText = `
    You Scored: ${score}/${randomizedQuestions.length}
    More details included with quiz result...
    `;
	alert(alertText);
}
