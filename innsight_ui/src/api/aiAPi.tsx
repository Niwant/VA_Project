import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "" , dangerouslyAllowBrowser: true});



async function hotel_summarize(data) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an AI operations advisor. Given the hotel location, luxury level, and review score, give me a textual summary for the hotel, as something that would attract a consumer to the hotel.**.
        
        ### Instructions:
        - Return text data only, with no additional headers or tails.
        - Keep the summary short and give it in markdown format

        ### Input Data:
        ${JSON.stringify(data)}
          `.trim()
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;

console.log(response);
return response;
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

async function events_review(data , events){
  const filteredData = events.map((event) => ({
    title : event.title,
    description: event.description,
    address: event.address[0],
  }));
  const completion = await groq.chat.completions
    .create({
      messages: [{
          role: "user",
          content: `
        You are an expert hotel business analyst. I will provide a list of upcoming local events happening near a hotel during a specific time frame.
        
        ### Your task:
        1. Analyze how these events could impact the hotel’s business performance — including occupancy, pricing, operations, and guest behavior.
        2. Summarize the insights in a clear, professional, business-oriented tone.
        3. Provide 1-2 strategic recommendations that the hotel should implement in preparation.
        4. Use only **Markdown format** for the entire response (headings, bullet points, bold text where needed). Do not return any other format or plain text.
        5. Dont provide any extra commentary or text outside the markdown format.
        6. Dont provide executive summary
        
        ### Structure:
        - **Event Impact Highlights** (bullet points)
        - **Strategic Recommendations** (bullet points)
        
        ### Hotel Info:
        ${JSON.stringify(data)}
        
        ### Upcoming Events:
        ${JSON.stringify(filteredData)}
        `.trim()
        },
      ], 
      model: "llama-3.3-70b-versatile",
    })
    const response = completion.choices[0].message.content;
    return response;
}

async function final_summary(hotel , reviewData) {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `
        You are an expert hotel business strategist. I will provide you with multiple types of data related to a hotel — including performance analytics, price comparisons, reviews, and nearby events.
        
        ### Your Task:
        Analyze all the input data holistically and provide a professional summary in **Markdown format only**.
        
       ### Output Requirements:
          Split your response into two clearly structured sections, using visually engaging and highly readable **Markdown formatting**.

          ---

          ## 🏨 Helping the Current Business

          Summarize actionable insights to help the **current hotel owner** optimize and improve business, using the provided analytics:

          ### 📊 Areas to Analyze:
          - Monthly ratings trends
          - Price per night (compared to competitors)
          - Inquiries, occupancy, and revenue patterns
          - Review category sentiment breakdown
          - Nearby event impact forecasts
          - Notable pricing or demand anomalies

          ### 🎯 Focus On:
          - **Growth opportunities**
          - **Operational risks or bottlenecks**
          - **Tactical actions** (pricing, staffing, service offerings, promotions)

          > ✅ **Use formatting like:**
          > - Bolded keywords
          > - Subsections under headings (e.g., ### Revenue Insights)
          > - Bullet points and numbered lists
          > - Tables (e.g., rating/category comparisons)
          > - Strategic highlight boxes or bold callouts

          ---

          ## 🧭 Section 2: Helping a New Entrant or Competitor

          Summarize insights for a **potential competitor or investor** considering entering the same market or analyzing this hotel.

          ### 🔍 Focus On:
          - Market saturation or opportunity gaps
          - Customer behavior and seasonal demand
          - Competitor pricing and service positioning
          - Review sentiment advantages/disadvantages
          - Strategic entry windows based on events or pricing

          > ✅ **Encourage use of:**
          > - Visual tables for competitive pricing/reviews
          > - Bullet points for opportunity lists
          > - Subheadings like ### Entry Timing Insights, ### Differentiation Opportunities
          > - Clean spacing and logical flow of insights

          ---

          ### 📝 Important Guidelines:
          - **Output must be in Markdown format only**.
          - Avoid raw data or JSON — provide **only summarized insights**.
          - Keep the tone **strategic, insightful, and professional**.
          - Make it feel like a slide or report section for executives.
          - Add whitespace between sections, break up long paragraphs, and format clearly.


        
        ### Input:
        - Hotel Info:
        ${JSON.stringify(hotel)}
        - Monthly rating trend
        - Price chart (by guests and room types)
        - Competitor pricing (10 hotels)
        - Review category comparison
        - Event impact analysis
        - Inquiry, occupancy, and revenue trends
        - Sentiment analysis of reviews
        - Nearby events
        - Any other relevant data
        ${JSON.stringify(reviewData)}
        `.trim()
        }
        
      ],
      model: "llama-3.3-70b-versatile",
    })
  const response = completion.choices[0].message.content;
  return response;
}


export default {hotel_summarize, occupancy_chart, inquiry, revenue, review_score , price_by_rooms , hotel_price_comparison , sentiment_review , events_review , final_summary};
