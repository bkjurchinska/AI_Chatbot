export const BASE_URL = "https://openrouter.ai/api/v1";
import {API_KEY} from "../config.js";

export async function sendMessage(messages, onChunk) {
    console.log('Sending message to API:', messages);

    //fetch function
    const response = await fetch(`${BASE_URL}/chat/completions`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "openrouter/free",
            messages: messages,
            stream: true 
        })
    });
    //error debugging
    if(!response.ok)
    {
        const errorText = await response.text();
        console.error("API error:", errorText);
        throw new Error("Request failed");
    }

    //reading response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullReply = "";
    //loop until done
    while (true) 
    {
        const {done, value} = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) 
        {
            if (line.startsWith("data: ") && line !== "data: [DONE]") 
            {
                try 
                {
                    const json = JSON.parse(line.substring(6));
                    const content = json.choices[0]?.delta?.content || "";
                    
                    if (content) 
                    {
                        fullReply = fullReply + content;
                        onChunk(content); 
                    }
                } catch (e) {}
            }
        }
    }
    return fullReply;

}




