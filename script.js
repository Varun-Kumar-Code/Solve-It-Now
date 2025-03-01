const API_KEY = 'Replace with your API key'; // Replace with your API key
const API_URL = `Your API URL`; // Replace with your API URL

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.textContent = body.dataset.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Generate Math Problem
document.getElementById('generate-problem').addEventListener('click', async () => {
  const prompt = "Generate a random math problem (algebra, calculus, or geometry).";
  const problem = await callyourapi(prompt);// call your api
  document.getElementById('generated-problem').innerText = problem;
});

// Generate box
document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generate-problem");
  const generatedProblemBox = document.getElementById("generated-problem");

  generateButton.addEventListener("click", function () {
    // Toggle the visibility of the generated problem box
    generatedProblemBox.hidden = !generatedProblemBox.hidden;

    // If the box is visible, add placeholder text
    if (!generatedProblemBox.hidden && !generatedProblemBox.textContent.trim()) {
      generatedProblemBox.textContent = "Hold on, generating for you...";
    }
  });
});





























// Solve Math Problem
document.getElementById('solve-problem').addEventListener('click', async () => {
  const problem = document.getElementById('math-input').value;
  if (!problem) {
    alert("Please enter a math problem!");
    return;
  }
  const prompt = `Solve the following math problem: ${problem}`;
  const solution = await callyourapi(prompt);// call your api 
  document.getElementById('solution').innerText = solution;
});

// Output Box
document.addEventListener("DOMContentLoaded", function () {
  const solveButton = document.getElementById("solve-problem");
  const solutionBox = document.getElementById("solution");

  solveButton.addEventListener("click", function () {
    // Toggle the visibility of the solution box
    solutionBox.hidden = !solutionBox.hidden;

    // If the solution box is visible, focus on it
    if (!solutionBox.hidden && !solutionBox.textContent.trim()) {
      solutionBox.textContent = "Hold on, generating analytics...";
    }
  });
});

// Function to call Your API
async function callyourapi(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt, // The user's prompt
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    // Extract the generated text from AI's response
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error)
  {
    console.error("Error calling Your API:", error);
    return "An error occurred. Please try again.";
  }
}