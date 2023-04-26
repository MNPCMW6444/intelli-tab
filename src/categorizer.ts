import axios from "axios";

export interface Tab {
  id: number;
  title: string;
  url: string;
  category: string;
}

// Function to get open tabs
export const getOpenTabs = async (): Promise<chrome.tabs.Tab[]> => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      resolve(tabs);
    });
  });
};

// Function to analyze tab content and categorize it
export const categorizeTabs = async (
  tabs: chrome.tabs.Tab[]
): Promise<Tab[]> => {
  const categorizedTabs: Tab[] = [];

  for (const tab of tabs) {
    if (!tab.title || !tab.url) continue;
    const category = await getCategoryFromOpenAI(tab.title, tab.url);
    categorizedTabs.push({
      id: tab.id as number,
      title: tab.title,
      url: tab.url,
      category,
    });
  }

  return categorizedTabs;
};

// Function to use OpenAI API for categorization

// ... (rest of the code)

// Function to use OpenAI API for categorization
const getCategoryFromOpenAI = async (
  title: string,
  url: string
): Promise<string> => {
  try {
    const prompt = `Categorize the following web page based on its title and URL:\n\nTitle: ${title}\nURL: ${url}\n\nCategory: `;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-002", // Replace this with the desired GPT-3 model
        prompt,
        max_tokens: 10,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer your_openai_api_key`,
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error("No category found");
    }
  } catch (error) {
    console.error("Error using OpenAI API:", error);
    return "Uncategorized";
  }
};
