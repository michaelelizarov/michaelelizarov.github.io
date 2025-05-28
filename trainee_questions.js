// trainee_questions.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const questionTextEl = document.getElementById('question-text');
    const answersContainerEl = document.getElementById('answers-container');
    const feedbackMessageEl = document.getElementById('feedback-message');
    const currentScoreEl = document.getElementById('current-score-value'); // Target the span for the value
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn'); // Will be the same button as submit, just text changes
    const noQuestionsMessageEl = document.getElementById('no-questions-message'); // For when no questions are available
    const getLocalizedString = typeof window.getTranslatedStringGlobal === 'function' ?
        window.getTranslatedStringGlobal :
        function(key, replacements = {}) { console.warn('getTranslatedStringGlobal not found for key:', key); return `[${key}]`; };
    let currentQuestionIndex = 0;
    let currentScenarioScore = 0; // Example score tracking
    const mockQuestions = [
        {
            id: 'q1',
            questionTextKey: 'question1_text',
            answers: [
                { answerTextKey: 'question1_ans1_text', isCorrect: false },
                { answerTextKey: 'question1_ans2_text', isCorrect: false },
                { answerTextKey: 'question1_ans3_text', isCorrect: true },
                { answerTextKey: 'question1_ans4_text', isCorrect: false }
            ],
            feedbackCorrectKey: 'question1_feedback_correct',
            feedbackIncorrectKey: 'question1_feedback_incorrect',
            points: 10
        },
        {
            id: 'q2',
            questionTextKey: 'question2_text',
            answers: [
                { answerTextKey: 'question2_ans1_text', isCorrect: true },
                { answerTextKey: 'question2_ans2_text', isCorrect: false },
                { answerTextKey: 'question2_ans3_text', isCorrect: false },
                { answerTextKey: 'question2_ans4_text', isCorrect: false }
            ],
            feedbackCorrectKey: 'question2_feedback_correct',
            feedbackIncorrectKey: 'question2_feedback_incorrect',
            points: 15
        },
        {
            id: 'q3',
            questionTextKey: 'question3_text',
            answers: [
                { answerTextKey: 'question3_ans1_text', isCorrect: true }, // Initial Access
                { answerTextKey: 'question3_ans2_text', isCorrect: false },
                { answerTextKey: 'question3_ans3_text', isCorrect: false },
                { answerTextKey: 'question3_ans4_text', isCorrect: false }
            ],
            feedbackCorrectKey: 'question3_feedback_correct',
            feedbackIncorrectKey: 'question3_feedback_incorrect',
            points: 20
        }
    ];
    function displayQuestion(index) {
        if (!questionTextEl || !answersContainerEl || !feedbackMessageEl || !submitAnswerBtn || !noQuestionsMessageEl) {
            console.error("Required question elements not found in DOM.");
            return;
        }
        feedbackMessageEl.innerHTML = ''; // Clear previous feedback
        feedbackMessageEl.classList.add('hidden');
        answersContainerEl.innerHTML = ''; // Clear previous answers
        if (index >= mockQuestions.length || mockQuestions.length === 0) {
            questionTextEl.textContent = getLocalizedString('no_questions_available');
            noQuestionsMessageEl.classList.remove('hidden');
            submitAnswerBtn.classList.add('hidden');
            return;
        }
        noQuestionsMessageEl.classList.add('hidden');
        const question = mockQuestions[index];
        questionTextEl.textContent = getLocalizedString(question.questionTextKey);
        question.answers.forEach((answer, i) => {
            const answerButton = document.createElement('button');
            answerButton.type = 'button';
            answerButton.className = 'answer-option-btn btn btn-neutral w-full text-left'; // Default styling
            answerButton.textContent = getLocalizedString(answer.answerTextKey);
            answerButton.dataset.answerIndex = i.toString();
            answerButton.dataset.isCorrect = answer.isCorrect.toString();
            answerButton.addEventListener('click', (e) => {
                // Remove 'selected' from other buttons
                answersContainerEl.querySelectorAll('.answer-option-btn').forEach(btn => btn.classList.remove('selected', 'btn-primary'));
                // Add 'selected' to clicked button
                e.currentTarget.classList.add('selected', 'btn-primary');
                e.currentTarget.classList.remove('btn-neutral');
            });
            answersContainerEl.appendChild(answerButton);
        });
        submitAnswerBtn.textContent = getLocalizedString('submit_answer_button');
        submitAnswerBtn.classList.remove('hidden');
        submitAnswerBtn.onclick = handleSubmitAnswer; // Assign specific handler
        submitAnswerBtn.disabled = false;
        // Enable answer buttons
        answersContainerEl.querySelectorAll('.answer-option-btn').forEach(btn => btn.disabled = false);
    }
    function handleSubmitAnswer() {
        const selectedButton = answersContainerEl.querySelector('.answer-option-btn.selected');
        if (!selectedButton) {
            alert(getLocalizedString('select_an_answer_alert')); // Add this key
            return;
        }
        const question = mockQuestions[currentQuestionIndex];
        const isCorrect = selectedButton.dataset.isCorrect === 'true';
        feedbackMessageEl.classList.remove('hidden', 'text-success-text', 'text-danger-text', 'bg-success-bg', 'bg-danger-bg'); // Clear previous color classes
        let feedbackTitleKey, feedbackTextKey;
        if (isCorrect) {
            feedbackTitleKey = 'feedback_correct_title';
            feedbackTextKey = question.feedbackCorrectKey || 'feedback_default_correct';
            currentScenarioScore += question.points;
            feedbackMessageEl.classList.add('text-success-text', 'bg-success-bg');
        } else {
            feedbackTitleKey = 'feedback_incorrect_title';
            feedbackTextKey = question.feedbackIncorrectKey || 'feedback_default_incorrect';
            feedbackMessageEl.classList.add('text-danger-text', 'bg-danger-bg');
        }
        feedbackMessageEl.innerHTML = `
            <strong class="block mb-1">${getLocalizedString(feedbackTitleKey)}</strong>
            ${getLocalizedString(feedbackTextKey)}
        `;
        if (currentScoreEl) currentScoreEl.textContent = currentScenarioScore;
        // Disable answer buttons and submit button
        answersContainerEl.querySelectorAll('.answer-option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.isCorrect === 'true' && btn !== selectedButton) { // Highlight correct if wrong one was chosen
                 btn.classList.add('border-green-500', 'ring-2', 'ring-green-500');
            }
            if (btn === selectedButton && !isCorrect){
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-danger', 'ring-2', 'ring-red-500'); // Highlight wrong selection
            } else if (btn === selectedButton && isCorrect){
                 btn.classList.remove('btn-primary');
                 btn.classList.add('btn-success', 'ring-2', 'ring-green-500'); // Highlight correct selection
            }
        });
        submitAnswerBtn.disabled = true; // Keep it as "Submit Answer" but disabled
        // Change button to "Next Question" or "Finish Scenario"
        const nextButtonEl = document.getElementById('next-action-button-questions'); // Assuming a dedicated button in HTML or reuse submitAnswerBtn
        if (nextButtonEl) { // Or create if not exists and append
            nextButtonEl.classList.remove('hidden');
            if (currentQuestionIndex < mockQuestions.length - 1) {
                nextButtonEl.textContent = getLocalizedString('next_question_button');
                nextButtonEl.onclick = () => {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                    nextButtonEl.classList.add('hidden'); // Hide itself until next answer
                    feedbackMessageEl.classList.add('hidden'); // Hide feedback
                };
            } else {
                nextButtonEl.textContent = getLocalizedString('finish_scenario_button_questions');
                nextButtonEl.onclick = () => {
                    // Navigate to MITRE ATT&CK view or scenario summary
                    window.location.href = 'trainee_mitre.html'; // Or a summary page
                };
            }
        } else {
            // Fallback: reuse submitAnswerBtn
            submitAnswerBtn.classList.remove('hidden');
            if (currentQuestionIndex < mockQuestions.length - 1) {
                submitAnswerBtn.textContent = getLocalizedString('next_question_button');
                submitAnswerBtn.onclick = () => {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                };
            } else {
                submitAnswerBtn.textContent = getLocalizedString('finish_scenario_button_questions');
                submitAnswerBtn.onclick = () => {
                    window.location.href = 'trainee_mitre.html';
                };
            }
            submitAnswerBtn.disabled = false; // Re-enable it as "Next" or "Finish"
        }
    }
    function initializePage() {
        if (typeof getLocalizedString === 'function' && window.translations &&
            Object.keys(window.translations[window.currentLang || 'he'] || {}).length > 10) {
            displayQuestion(currentQuestionIndex);
            if (currentScoreEl) currentScoreEl.textContent = currentScenarioScore;
        } else {
            setTimeout(initializePage, 150);
        }
    }
    setTimeout(initializePage, 100);
    window.updatePageSpecificTranslations = function(langPack, lang) {
        initializePage(); // Re-render current question with new language
        // Also update static elements if any are missed by app-global's general pass
        const submitBtnCurrentTextKey = submitAnswerBtn.dataset.currentKey || 'submit_answer_button';
        submitAnswerBtn.textContent = getLocalizedString(submitBtnCurrentTextKey);
        const nextActionBtn = document.getElementById('next-action-button-questions');
        if(nextActionBtn && !nextActionBtn.classList.contains('hidden')){
            const isLastQuestion = currentQuestionIndex >= mockQuestions.length - 1;
            nextActionBtn.textContent = getLocalizedString(isLastQuestion ? 'finish_scenario_button_questions' : 'next_question_button');
        }
    };
    // Add new translation keys used in this JS
    if (window.translations) {
        const he = window.translations.he; const en = window.translations.en;
        if(he) he.select_an_answer_alert = he.select_an_answer_alert || "אנא בחר תשובה לפני ההגשה.";
        if(en) en.select_an_answer_alert = en.select_an_answer_alert || "Please select an answer before submitting.";
    }
});