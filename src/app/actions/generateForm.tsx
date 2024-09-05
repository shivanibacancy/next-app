"use server"

import { Description } from "@radix-ui/react-dialog"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateForm(
    prevState: {
        message: string
    },
    formData: FormData 
) {
    const schema = z.object({
        description: z.string().min(10).max(100)
    }) 

    const parse = schema.safeParse({
        description: formData.get("description")
    })

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(`process.env.API_KEY`);
    console.log("GenAI", genAI);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    if(!parse.success) {
        console.log(parse.error)
        return {
            message: "Failed to parse data" 
        }
    }

    const data = parse.data
    const promptExplanation= ""

    if(!process.env.OPENAI_API_KEY) {
        return {
            message: "No OpenAi API key found"
        }
    }

    try {
       const response = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY?? ""}`
        },
        method: "POST",
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `${data.description}`
                }
            ]
        })
       })
       const json = await response.json()
       revalidatePath("/")
       return {
        message: "success", data: json
       }
    } catch(e) {
        console.log(e)
        return{
            message: "Failed to create form"
        }
    }
}