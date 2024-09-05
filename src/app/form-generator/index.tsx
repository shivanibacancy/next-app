"use client"

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateForm } from '@/actions/generateForm'
import { useFormState, useFormStatus } from 'react-dom'
import { useSession, signIn } from 'next-auth/react'
import { GoogleGenerativeAI } from "@google/generative-ai"


type Props = {}

const initialState : {
    message: string;
    data?: any;
} = {
    message: ""
}

export function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending? "Generating...": "Submit"}
        </Button>
    )
}

const FormGenerator = (props: Props) => { 
    const [open, setOpen] = useState(false); 
    const [state, formAction] = useFormState(generateForm, initialState)

    const session = useSession()
    console.log(session)

    //AI generator
    const genAI = new GoogleGenerativeAI("AIzaSyCaM8FyBqnoJ7rvE7v9AgXythI2UXYvGbU")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    async function run() {
        const prompt = "create a form for developers to understand what tech stack they want to learn and help them in their career growth"
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("text",text);
    }

    useEffect(() => {
        run()
    })

    useEffect(() => {
        if(state.message === "success") {
            setOpen(false)
        }
        console.log(state)
    }, [state.message])

    const onFormCreate = () => {
        if(session.data?.user) {
            setOpen(true);
        } else {
            signIn();
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={onFormCreate}>Create  Form</Button>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>    
                    <DialogTitle>Create New Form</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <Textarea id="description" name="description" required placeholder='Share what your form is about , who is it for, and what information would it like to collect. Then, AI will do the magic ✨' style={{height: "135px"}} />
                    </div>
                    
                    <DialogFooter>
                        <SubmitButton />
                        <Button variant="link">Create Manually</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default FormGenerator