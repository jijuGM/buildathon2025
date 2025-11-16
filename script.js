const appData = {
    users: [],
    currentUser: null,
    questionnaire: [
        {
            id: 1,
            question: "What is your primary mode of transportation?",
            type: "radio",
            options: ["Car", "Public Transit", "Bicycle", "Walking", "Motorcycle"],
            answer: null
        },
        {
            id: 2,
            question: "How many miles do you drive per week?",
            type: "number",
            answer: null
        },
        {
            id: 3,
            question: "Do you use public transportation?",
            type: "radio",
            options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
            answer: null
        },
        {
            id: 4,
            question: "How often do you fly per year?",
            type: "number",
            answer: null
        },
        {
            id: 5,
            question: "What type of diet do you follow?",
            type: "radio",
            options: ["Omnivore", "Vegetarian", "Vegan", "Pescatarian"],
            answer: null
        },
        {
            id: 6,
            question: "How often do you eat meat?",
            type: "radio",
            options: ["Daily", "3-4 times/week", "1-2 times/week", "Rarely", "Never"],
            answer: null
        },
        {
            id: 7,
            question: "Do you buy local produce?",
            type: "radio",
            options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
            answer: null
        },
        {
            id: 8,
            question: "What is your home's primary heating source?",
            type: "radio",
            options: ["Natural Gas", "Electricity", "Oil", "Renewable", "Other"],
            answer: null
        },
        {
            id: 9,
            question: "Do you use renewable energy at home?",
            type: "radio",
            options: ["Yes", "No", "Partially"],
            answer: null
        },
        {
            id: 10,
            question: "How many people live in your household?",
            type: "number",
            answer: null
        },
        {
            id: 11,
            question: "What is your home size (sq ft)?",
            type: "number",
            answer: null
        },
        {
            id: 12,
            question: "Do you recycle regularly?",
            type: "radio",
            options: ["Yes", "No", "Sometimes"],
            answer: null
        },
        {
            id: 13,
            question: "Do you compost?",
            type: "radio",
            options: ["Yes", "No", "Planning to"],
            answer: null
        },
        {
            id: 14,
            question: "How often do you buy new clothes?",
            type: "radio",
            options: ["Monthly", "Every 3 months", "Every 6 months", "Yearly", "Rarely"],
            answer: null
        },
        {
            id: 15,
            question: "Do you buy second-hand items?",
            type: "radio",
            options: ["Frequently", "Sometimes", "Rarely", "Never"],
            answer: null
        },
        {
            id: 16,
            question: "How much water do you consume daily (liters)?",
            type: "number",
            answer: null
        },
        {
            id: 17,
            question: "Do you use energy-efficient appliances?",
            type: "radio",
            options: ["All", "Most", "Some", "Few", "None"],
            answer: null
        },
        {
            id: 18,
            question: "How often do you use air conditioning?",
            type: "radio",
            options: ["Daily", "Weekly", "Monthly", "Seasonally", "Rarely"],
            answer: null
        },
        {
            id: 19,
            question: "Do you use reusable bags and containers?",
            type: "radio",
            options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
            answer: null
        },
        {
            id: 20,
            question: "Are you willing to offset your carbon footprint?",
            type: "radio",
            options: ["Yes", "No", "Maybe", "Already doing it"],
            answer: null
        }
    ],
    currentQuestionIndex: 0
};

// ===================== PAGE NAVIGATION =====================

function showSignup() {
    document.getElementById('landingPage').classList.remove('active');
    document.getElementById('authContainer').classList.remove('auth-modal-hidden');
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
}

function showLogin() {
    document.getElementById('landingPage').classList.remove('active');
    document.getElementById('authContainer').classList.remove('auth-modal-hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function switchToSignup(event) {
    event.preventDefault();
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
}

function switchToLogin(event) {
    event.preventDefault();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function closeAuth() {
    document.getElementById('authContainer').classList.add('auth-modal-hidden');
    document.getElementById('landingPage').classList.add('active');
}

// ===================== AUTHENTICATION =====================

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const age = document.getElementById('signupAge').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (age < 13) {
        alert('You must be at least 13 years old!');
        return;
    }

    const user = {
        id: Date.now(),
        name,
        email,
        age,
        phone,
        password,
        createdAt: new Date()
    };

    appData.users.push(user);
    appData.currentUser = user;

    // Reset form
    document.getElementById('signupForm').querySelector('form').reset();

    // Navigate to home
    goToHomePage();
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Accept all login attempts
    appData.currentUser = {
        email: email,
        password: password,
        name: 'Guest User'
    };

    document.getElementById('loginForm').querySelector('form').reset();
    goToHomePage();
}

function goToHomePage() {
    const authContainer = document.getElementById('authContainer');
    authContainer.style.display = 'none';
    authContainer.classList.add('auth-modal-hidden');

    document.getElementById('landingPage').classList.remove('active');
    document.getElementById('homePage').classList.add('active');
}

function logout() {
    appData.currentUser = null;
    appData.currentQuestionIndex = 0;
    appData.questionnaire.forEach(q => q.answer = null);

    document.getElementById('homePage').classList.remove('active');
    document.getElementById('landingPage').classList.add('active');
    document.getElementById('questionnaireModal').classList.add('hidden');
}

// ===================== DROPDOWN MENU =====================

function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const arrow = document.querySelector('.dropdown-arrow');

    menu.classList.toggle('active');
    arrow.classList.toggle('rotate');

    document.addEventListener('click', function handler(event) {
        if (!event.target.closest('.dropdown')) {
            menu.classList.remove('active');
            arrow.classList.remove('rotate');
            document.removeEventListener('click', handler);
        }
    });
}

function scrollToSection(sectionId) {
    document.getElementById('dropdownMenu').classList.remove('active');
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===================== QUESTIONNAIRE =====================

function openProfileQuestionnaire() {
    document.getElementById('questionnaireModal').classList.remove('hidden');
    appData.currentQuestionIndex = 0;
    renderQuestion();
    updateNavigationButtons();
}

function closeQuestionnaire() {
    document.getElementById('questionnaireModal').classList.add('hidden');
    appData.currentQuestionIndex = 0;
}

function renderQuestion() {
    const question = appData.questionnaire[appData.currentQuestionIndex];
    const container = document.getElementById('questionnaireContainer');

    document.getElementById('currentQuestion').textContent = appData.currentQuestionIndex + 1;

    container.innerHTML = '';

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';

    const label = document.createElement('label');
    label.textContent = question.question;
    questionDiv.appendChild(label);

    if (question.type === 'radio') {
        const radioGroup = document.createElement('div');
        radioGroup.className = 'radio-group';

        question.options.forEach(option => {
            const option_div = document.createElement('div');
            option_div.className = 'radio-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${question.id}`;
            input.value = option;
            input.id = `option${question.id}_${option}`;

            if (question.answer === option) {
                input.checked = true;
            }

            input.addEventListener('change', () => {
                question.answer = option;
            });

            const optionLabel = document.createElement('label');
            optionLabel.htmlFor = `option${question.id}_${option}`;
            optionLabel.textContent = option;
            optionLabel.style.marginLeft = '8px';

            option_div.appendChild(input);
            option_div.appendChild(optionLabel);
            radioGroup.appendChild(option_div);
        });

        questionDiv.appendChild(radioGroup);
    } else if (question.type === 'number') {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.value = question.answer || '';
        input.addEventListener('input', () => {
            question.answer = input.value;
        });
        questionDiv.appendChild(input);
    }

    container.appendChild(questionDiv);
}

function nextQuestion() {
    if (appData.currentQuestionIndex < appData.questionnaire.length - 1) {
        appData.currentQuestionIndex++;
        renderQuestion();
        updateNavigationButtons();
    }
}

function previousQuestion() {
    if (appData.currentQuestionIndex > 0) {
        appData.currentQuestionIndex--;
        renderQuestion();
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.style.display = appData.currentQuestionIndex === 0 ? 'none' : 'block';

    if (appData.currentQuestionIndex === appData.questionnaire.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function submitQuestionnaire() {
    const unanswered = appData.questionnaire.filter(q => q.answer === null);

    if (unanswered.length > 0) {
        alert('Please answer all questions before submitting!');
        return;
    }

    if (appData.currentUser) {
        appData.currentUser.questionnaire = JSON.parse(JSON.stringify(appData.questionnaire));
    }

    alert('Your carbon profile has been created successfully!');
    closeQuestionnaire();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('CarbonSense website loaded successfully!');
});

/* ============================================================
   🌍 WORLD MAP CLICK HANDLER (FINAL WORKING VERSION)
   ============================================================ */

const countries = document.querySelectorAll("#worldSVG path");

// Info box
let infoBox = document.getElementById("info");

// Auto-create if not present
if (!infoBox) {
    infoBox = document.createElement("div");
    infoBox.id = "info";
    infoBox.style.position = "fixed";
    infoBox.style.top = "120px";
    infoBox.style.right = "40px";
    infoBox.style.background = "rgba(255,255,255,0.12)";
    infoBox.style.color = "white";
    infoBox.style.padding = "15px";
    infoBox.style.borderRadius = "10px";
    infoBox.style.backdropFilter = "blur(6px)";
    infoBox.style.zIndex = "9999";
    document.body.appendChild(infoBox);
}

if (countries.length === 0) {
    console.warn("⚠ No countries found in #worldSVG. Check your SVG structure.");
}

countries.forEach(country => {
    country.addEventListener("click", () => {

        const name = country.getAttribute("name") || country.id;

        // Remove selection from all
        countries.forEach(c => c.classList.remove("selected"));

        // Highlight selected
        country.classList.add("selected");

        // Update info panel
        infoBox.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Emissions:</strong> 4.5 tonnes (example)</p>
            <p><strong>Status:</strong> Medium</p>
        `;
    });
});
