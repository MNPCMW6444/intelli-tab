import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  },
});

export const generateCompletion = async (prompt: string) => {
  try {
    const response = await instance.post("", {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 7,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: "\n",
    });

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].text;
    } else {
      throw new Error("No completions found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
