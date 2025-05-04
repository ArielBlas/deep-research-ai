"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeepResearchStore } from "@/store/deepResearch";

const formSchema = z.object({
  answer: z.string().min(1, "Answer is required!"),
});

const QuestionForm = () => {
  const { questions } = useDeepResearchStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="w-full max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] shadow-none">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-base text-primary/50">
          Question 1 of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 w-full px-4 sm:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type your answer here"
                      {...field}
                      className="px-4 py-2 text-base resize-none placeholder:text-sm border-black/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
