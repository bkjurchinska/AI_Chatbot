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
export async function getMessages(request: Request) {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    if(!userId) return NextResponse.json({error: "Missing userId"}, {status: 400});

    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(messagesData[userId] || []);
}

//savinga message and getting AI response
export async function saveMessage(request: Request) {
    const {text, userId} = await request.json();
    if (!messagesData[userId]) messagesData[userId] = [];
    //save users msg
    const userMsg = {id: Date.now(), text, sender: "user"};
    messagesData[userId].push(userMsg);
    //call openrouter
    try{
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages: [{role: "user", content: text}]   
            }) 
        })
    }


    const data = await response.json();
    const aiTxt = data.choices[0].message.content;
    const aiMsg = {id: Date.now() + 1, text: aiTxt, sender: "ai"};
    messagesData[userId].push(aiMsg); //save ai msg

    return NextResponse.json(aiMsg);
}
    catch (error) {
        console.error("No AI response", error);
        return NextResponse.json({error: "AI failed"}, {status: 500});
    }


