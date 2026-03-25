import { GoogleGenAI, Type } from "@google/genai";
import { FeedItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailyBriefing = async (items: FeedItem[]) => {
  if (!items || items.length === 0) return null;

  // Prepare a simplified string version of the feed for the model
  const feedContext = items.map(item => 
    `[${item.type}] From: ${item.author.name} | Subject: ${item.title} | Content: ${item.preview} | Urgent: ${item.isUrgent}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an executive assistant AI. 
      Analyze the following feed of emails, chats, and meetings. 
      Create a JSON summary with:
      1. A simplified "morning_brief" (max 2 sentences) summarizing the mood/workload.
      2. A list of 3 "top_priorities" extracted from the items.
      3. A "workload_score" from 0-100 based on urgency and volume.
      
      Feed Data:
      ${feedContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            morning_brief: { type: Type.STRING },
            top_priorities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            workload_score: { type: Type.INTEGER }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      morning_brief: "Ready for the day. Connect to Gemini for smart insights.",
      top_priorities: ["Check Unread Emails", "Review Teams Messages", "Prepare for Meetings"],
      workload_score: 50
    };
  }
};