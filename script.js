const API_KEY = 'Replace with your API key'; // Replace with your Gemini API key
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
  const problem = await callGemini(prompt);
  document.getElementById('generated-problem').innerText = problem;
});

// Solve Math Problem
document.getElementById('solve-problem').addEventListener('click', async () => {
  const problem = document.getElementById('math-input').value;
  if (!problem) {
    alert("Please enter a math problem!");
    return;
  }
  const prompt = `Solve the following math problem: ${problem}`;
  const solution = await callGemini(prompt);
  document.getElementById('solution').innerText = solution;
});

// Function to call Gemini API
async function callGemini(prompt) {
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
    // Extract the generated text from Gemini's response
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred. Please try again.";
  }
}