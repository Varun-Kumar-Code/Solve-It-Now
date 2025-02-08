const API_KEY = 'AIzaSyD_szrlCkGVNhwYO30fVcY7_z_Sbc6ppq4'; // Replace with your API key
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Generate Math Problem
document.getElementById('generate-problem').addEventListener('click', async () => {
  const prompt = "Generate a random math problem (algebra, calculus, or geometry).";
  const problem = await callOpenAI(prompt);
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
  const solution = await callOpenAI(prompt);
  document.getElementById('solution').innerText = solution;
});

// Function to call OpenAI API
async function callOpenAI(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "An error occurred. Please try again.";
  }
}