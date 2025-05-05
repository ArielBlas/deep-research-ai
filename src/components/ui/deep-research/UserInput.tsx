"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeepResearchStore } from "@/store/deepResearch";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  input: z.string().min(2).max(200),
});

const UserInput = () => {
  const { setQuestions, setTopic, isLoading, setIsLoading } =
    useDeepResearchStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      setTopic(values.input);
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        body: JSON.stringify({
          topic: values.input,
        }),
      });
      const data = await response.json();
      setQuestions(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center justify-center gap-4 w-[50vw"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormControl>
                <Input
                  placeholder="Enter your research topic"
                  {...field}
                  className="rounded-full w-full p-4 py-6 placeholder:text-sm bg-white/60 border-solid shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full px-6 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UserInput;
