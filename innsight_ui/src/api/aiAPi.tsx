import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" , dangerouslyAllowBrowser: true});


async function hotel_summarize(data) {
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

async function occupancy_chart(data) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI operations advisor. Given the hotel location, luxury level, and room size, predict the **monthly occupancy rate (as percentage)**.
        
        ### Instructions:
        - Return a clean **JSON object** only.
        - Format:
        \`\`\`json
        {
          "January": 78,
          "February": 81,
          ...
          "December": 90
        }
        \`\`\`
        - No commentary or notes, only the JSON data.
        - Values should reflect realistic occupancy trends.
        
        ### Input Data:
        ${JSON.stringify(data)}
          `.trim()
        }
        ,
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

async function revenue(data) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI business analyst helping with hotel revenue forecasting. Based on the provided hotel details — location, luxury rating, and room size — generate **monthly estimated revenue in USD** for the hotel.
        
        ### Instructions:
        - Return a **strictly formatted JSON object**.
        - Format:
        \`\`\`json
        {
          "January": 12000,
          "February": 13500,
          ...
          "December": 14200
        }
        \`\`\`
        - Do **not** include any commentary or extra text.
        - Use realistic values depending on the hotel data and seasonal demand.
        
        ### Input Data:
        ${JSON.stringify(data)}
          `.trim()
        }
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

async function inquiry(data) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI assistant helping forecast user interest in hotels. Based on the hotel’s location, luxury, and room configuration, estimate the **number of monthly inquiries** the hotel is likely to receive.
        
        ### Instructions:
        - Output must be valid **JSON only**.
        - Format:
        \`\`\`json
        {
          "January": 320,
          "February": 290,
          ...
          "December": 410
        }
        \`\`\`
        - Do not include any text except the JSON block.
        - Consider travel trends and seasonal demand based on the input.
        
        ### Input Data:
        ${JSON.stringify(data)}
          `.trim()
        }
        
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

async function review_score(data) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
      You are an AI analyst helping with hotel business intelligence. Based on the provided hotel details — including location, luxury rating, and room capacity — generate **monthly average rating data** (from 0.0 to 5.0) for the hotel.
      
      ### Instructions:
      - Return the result as a **strictly formatted JSON object**.
      - Format: 
      \`\`\`json
      {
        "January": 4.3,
        "February": 4.1,
        ...
        "December": 4.6
      }
      \`\`\`
      - Do **not** include any extra commentary, explanation, or text — only valid JSON output.
      - Use realistic but varied values based on the input data.
      
      ### Input Data:
      ${JSON.stringify(data)}
          `.trim(),
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

async function price_by_rooms(data){
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI assistant helping generate monthly hotel pricing data.
        
        ### Task:
        Given the location, luxury rating, and room configuration of a hotel, generate realistic **monthly average prices per night**:
        - By number of guests (2, 4, 6)
        - By room type (Standard, Deluxe, Suite)
        
        ### Format:
        Return a strictly formatted JSON object in the format below:
        \`\`\`json
        {
          "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          "pricesByGuests": {
            "2 Guests": [120, 125, 130, 135, 128, 132],
            "4 Guests": [160, 165, 170, 180, 168, 175],
            "6 Guests": [200, 210, 220, 230, 215, 225]
          },
          "pricesByRoomType": {
            "Standard": [100, 110, 105, 108, 112, 115],
            "Deluxe": [140, 145, 150, 148, 155, 160],
            "Suite": [190, 195, 205, 210, 218, 225]
          }
        }
        \`\`\`
        
        ### Instructions:
        - Output must be valid JSON only. No extra text.
        - Keep prices realistic and adjust them based on seasonal trends and input.
        - Use only 6 months (Jan–Jun) for simplicity.
        
        ### Hotel Info:
        ${JSON.stringify(data)}
        `.trim()
        }
        
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

async function hotel_price_comparison(data , hotel){
  const filteredData = data.map((hotel) => (hotel.name));
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI assistant for hotel market analysis.
        
        ### Task:
        Given the name, location, and characteristics of a hotel, and a list of nearby hotels, generate a comparison of **average nightly prices** between the given hotel and 10 nearby hotels from the list.
        
        ### Format:
        Return strictly formatted JSON only:
        \`\`\`json
        {
          "labels": ["Your Hotel", "Hotel A", "Hotel B", ..., "Hotel J"],
          "datasets": [
            {
              "label": "Avg. Price ($) Per Night",
              "data": [120, 110, 135, ..., 125],
              "backgroundColor": "rgba(75, 192, 192, 0.6)"
            }
          ]
        }
        \`\`\`
        
        ### Instructions:
        - Include **"Your Hotel"** as the first label.
        - Select **10 hotel names** from the given list to use in the comparison (avoid duplicates).
        - Generate realistic average nightly prices based on location and luxury level.
        - Do **not** include extra commentary or text.
        
        ### Input Data:
        ### selected hotel:
        ${JSON.stringify(hotel)}

        #### Hotel List:
        ${JSON.stringify(filteredData)}`.trim()
        }
        
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

async function sentiment_review(data , hotels){

  const filteredData = hotels.map((hotel) => ({
    hotel_name: hotel.hotel_name,
    review_breakdown: hotel.reviews_breakdown,
  }));
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI assistant for hotel analytics.

### Task:
Given the review breakdown of one selected hotel ("Your Hotel") and a list of competitor hotels with their own review breakdowns, generate a JSON object that compares **average review scores per category**.

Use only the categories that appear in the selected hotel's \`review_breakdown\`. Ignore any extra or missing categories in competitors.

The data value range sthould be between 1-5

### Output Format:
Return a strictly formatted JSON response:
\`\`\`json
{{
  "labels": ["Cleanliness", "Location", "Service", "Value", "Facilities"],
  "datasets": [
    {
      "label": "Your Hotel",
      "data": [4.5, 4.2, 3.8, 4.0, 4.1],
      "backgroundColor": "rgba(255, 99, 132, 0.2)",
      "borderColor": "rgba(255, 99, 132, 1)",
      "borderWidth": 1
    },
    {
      "label": "Competitor Avg",
      "data": [4.2, 4.3, 4.1, 3.9, 4.0],
      "backgroundColor": "rgba(54, 162, 235, 0.2)",
      "borderColor": "rgba(54, 162, 235, 1)",
      "borderWidth": 1
    }
  ]
}
\`\`\`

### Instructions:
- Use the exact category order and names from the selected hotel's breakdown.
- For competitors, compute average score **only for the same categories**.
- Output only valid JSON — no explanations or additional text.
        ### Input:
        #### Your Hotel:
        ${JSON.stringify({hotel_name : data.name , review_breakdown : data.reviews_breakdown})}
        
        #### Competitor Hotels:
        ${JSON.stringify(filteredData)}
        `.trim()
        }
        
        
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


export default {hotel_summarize, occupancy_chart, inquiry, revenue, review_score , price_by_rooms , hotel_price_comparison , sentiment_review};
