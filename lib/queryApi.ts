import genAI from "./gemini";

interface ApiError extends Error {
  status?: number;
  type?: string;
  code?: string;
}

const query = async (prompt: string, model: string) => {
  // Check if API key is available
  if (!process.env.GOOGLE_AI_API_KEY) {
    console.error("Google AI API key is not set!");
    return "Error: Google AI API key is not configured. Please check your environment variables.";
  }

  console.log("Using model:", model);
  console.log("API Key available:", !!process.env.GOOGLE_AI_API_KEY);

  try {
    // Use gemini-1.5-flash model (current model name)
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (err: unknown) {
    const error = err as ApiError;
    console.error("Google AI API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
    });
    return "Error finding that message, please try again!";
  }
};

export default query;
