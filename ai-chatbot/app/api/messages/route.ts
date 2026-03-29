import { NextResponse } from 'next/server';

//server side database
let messagesData: Record<string, any[]> = {
    "session-1": [
        {id: 1, text: "Welcome to NEO AI. How can I help you?", sender: "ai"},
        {id: 2, text: "Testing mock API", sender: "user"},
    ],
    "session-2": [
        {id: 1, text: "Data analysis is complete!", sender: "ai"}
    ]
};

//get messages for a spec session
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    if(!userId) return NextResponse.json({error: "Missing userId"}, {status: 400});

    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(messagesData[userId] || []);
}

//savinga message and getting AI response
export async function POST(request: Request) {

    try{
        const body = await request.json();
        const { text, userId } = body;

        if(!text || !userId) {
            return NextResponse.json({ error: "Missing text or userId" }, { status: 400 });
        }
        
        if (!messagesData[userId]) messagesData[userId] = [];

        const userMsg = { id: Date.now(), text, sender: "user" };
        messagesData[userId].push(userMsg); //save user msg

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "liquid/lfm-2.5-1.2b-thinking:free",
                messages: [{role: "user", content: text}]   
            }) 
        });

    if (!response.ok) {
        const errorData = await response.text();
        console.error("Openrouter API error", errorData);
        return NextResponse.json({error: "AI provider error"}, {status: 500});
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message) {
        const aiTxt = data.choices[0].message.content;
        const aiMsg = { id: Date.now() + 1, text: aiTxt, sender: "ai" };
        
        messagesData[userId].push(aiMsg); // Save AI msg
        return NextResponse.json(aiMsg);
    } else {
        console.error("Unexpected AI response", data);
        return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }
}

    catch (error) {
        console.error("No AI response", error);
        return NextResponse.json({error: "AI failed"}, {status: 500});
    }

}


