document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const formSteps = document.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".step");
    const nextBtns = document.querySelectorAll(".next");
    const prevBtns = document.querySelectorAll(".prev");
    const form = document.getElementById("multiStepForm");

    function showStep(step) {
        formSteps.forEach((stepElement, index) => {
            stepElement.classList.toggle("active", index === step);
        });

        progressSteps.forEach((stepElement, index) => {
            stepElement.classList.toggle("active", index <= step);
        });

        if (step === formSteps.length - 1) {
            updateReview();
        }
    }

    function validateStep(step) {
        let inputs = formSteps[step].querySelectorAll("input, select, textarea");
        for (let input of inputs) {
            if (input.hasAttribute("required") && !input.value.trim()) {
                alert("Please fill all required fields.");
                return false;
            }
        }
        return true;
    }

    function updateReview() {
        document.getElementById("reviewName").textContent = document.getElementById("name").value;
        document.getElementById("reviewDob").textContent = document.getElementById("dob").value;
        document.getElementById("reviewGender").textContent = document.getElementById("gender").value;
        document.getElementById("reviewEmail").textContent = document.getElementById("email").value;
        document.getElementById("reviewPhone").textContent = document.getElementById("phone").value;
        document.getElementById("reviewAddress").textContent = document.getElementById("address").value;
    }

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep < formSteps.length) {
                    showStep(currentStep);
                }
            }
        });
    });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    form.addEventListener("submit", function (e) {
        if (!validateStep(currentStep)) {
            e.preventDefault();
        } else {
            alert("Form submitted successfully!");
        }
    });

    // Initialize the first step
    showStep(currentStep);
});
