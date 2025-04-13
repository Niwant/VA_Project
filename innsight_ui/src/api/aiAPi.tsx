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
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}


export default hotel_summarize;