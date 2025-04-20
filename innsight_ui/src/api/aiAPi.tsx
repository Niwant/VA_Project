import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" , dangerouslyAllowBrowser: true});

async function hotel_summarize() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "You are now a hotel business helper , I will give you some features such as how I am planning to make my hotel and location you will give me estimated analytics and 3 hotels similar in the nearby location I want everything in json format \n Hotel Location: Las Vegas \n Luxury: 3 star hotel \n Rooms: 2-8 people rooms\n Modern Architecutre , swimming pool , garden , massage , gym , 24*7 buffet ",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  const cleaned = response.replace(/```json|```/g, '').trim();

// Step 2: Parse JSON
const result = JSON.parse(cleaned);

console.log(result.name);
return result.name;
}

async function occupancy_chart() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "You are now a hotel business helper. I will give you location of the hotel and details like star rating and max room occupancy. You will provide me data of approx occupancy in the hotel according to month. I want it in json format \n Location: Las Vegas \n Luxury: 3 star hotel \n Rooms: 2-6 people rooms",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  const cleaned = response.replace(/```json|```/g, '').trim();

// Step 2: Parse JSON
const result = JSON.parse(cleaned);

console.log(result.name);
return result.name;
}

async function revenue() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "You are helping me with my hotel business project. I will provide you with the location, luxury rating and room size for the hotel. You need to help me get data for the revenue of the hotel month-wise. I want it in json format, with no additional textual content \n Location: Las Vegas \n Luxury: 3 star hotel \n Rooms: 2-6 people rooms",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  const cleaned = response.replace(/```json|```/g, '').trim();

// Step 2: Parse JSON
const result = JSON.parse(cleaned);

console.log(result.name);
return result.name;
}

async function inquiry() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "You are helping me with my hotel business project. I will provide you with the location, luxury rating and room size for the hotel. You need to help me get data for the no of inquiries of the hotel month-wise. I want it in json format, with no additional textual content \n Location: Las Vegas \n Luxury: 3 star hotel \n Rooms: 2-6 people rooms",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  const cleaned = response.replace(/```json|```/g, '').trim();

// Step 2: Parse JSON
const result = JSON.parse(cleaned);

console.log(result);
return result;
}

async function review_score() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "You are helping me with my hotel business project. I will provide you with the location, luxury rating and room size for the hotel. You need to help me get data for the rating of the hotel month-wise. Give me rating from 0.0 to 5.0. I want it in json format, with no additional textual content \n Location: Las Vegas \n Luxury: 3 star hotel \n Rooms: 2-6 people rooms",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  const cleaned = response.replace(/```json|```/g, '').trim();

// Step 2: Parse JSON
const result = JSON.parse(cleaned);

console.log(result);
return result;
}

export default {hotel_summarize, occupancy_chart, inquiry, revenue, review_score};
