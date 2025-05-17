const quizContent = [
    { question: "What is Sustainable Development Goal (SDG) 5 focused on?", 
        options: ["Zero Hunger", "No Poverty", "Quality Education", "Gender Equality"], answer: 3 },
    { question: "What is the main goal of this SDG?",
      options: ["To prove women are superior", "To provide equal right and treatment of both genders", "To prove men are superior", "To have gender discourse"], answer: 1 },
    { question: "What is a main cause of gender inequality", 
      options: ["History", "Unequal Pay", "Discrimination and Bias", "Men"], answer: 2 },
    { question: "What is an effect of gender inequality?", 
      options: ["Equal rights", "No harassment", "Disparities in opportunities", "More opportunities"], answer: 2 },
    { question: "What can we do to prevent gender inequality?", 
        options: ["Promote gender-responsive policies", "Do nothing", "Promote biases", "Harass the otherngender"],  answer: 0 }
];

let questionIndex = 0;
let totalScore = 0;
let hasAnswered = false;

function displayQuiz() 
{
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("prevBtn").disabled = questionIndex === 0;

    const currentQ = quizContent[questionIndex];
    document.getElementById("quizQuestion").textContent = currentQ.question;

    const choicesContainer = document.getElementById("answerChoices");
    choicesContainer.innerHTML = "";
    hasAnswered = false;

    for (let i = 0; i < currentQ.options.length; i++) 
    {
        let choiceButton = document.createElement("button");
        choiceButton.textContent = currentQ.options[i];
        choiceButton.classList.add("choiceBtn");
        choiceButton.onclick = function () 
        {
            if (!hasAnswered) 
            {
                verifyAnswer(i, choiceButton);
            }
        };
        choicesContainer.appendChild(choiceButton);
    }
}

function verifyAnswer(selectedIdx, buttonElement) 
{
    if (hasAnswered) return;

    let correctAnswerIndex = quizContent[questionIndex].answer;
    switch (selectedIdx) 
    {
        case correctAnswerIndex:
            buttonElement.classList.add("correct");
            totalScore++;
            break;
        default:
            buttonElement.classList.add("incorrect");
            document.querySelectorAll(".choiceBtn")[correctAnswerIndex].classList.add("correct");
            break;
    }

    hasAnswered = true;
    document.getElementById("nextBtn").disabled = false;
}

function nextQue() 
{
    if (questionIndex < quizContent.length - 1) 
    {
        questionIndex++;
        displayQuiz();
    } 
    else
    {
        results();
    }
}

function prevQue() 
{
    if (questionIndex > 0) 
    {
        questionIndex--;
        displayQuiz();
    }
}

function results() 
{
    document.getElementById("score").textContent = `YOUR SCORE: ${totalScore}/${quizContent.length}`;

    let resultMessage = "";

    if (totalScore < 3) {
        resultMessage = "You did well! Keep learning as education is key in combating gender inequality!";
    } else {
        resultMessage = "Great job! You're going to be of big help!";
    }

    document.getElementById("resultMessage").textContent = resultMessage;
    document.getElementById("quizQuestion").textContent = "Quiz Completed!";
    document.getElementById("answerChoices").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
}

displayQuiz();  