import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  author_name: z.string().min(2, "Name must be at least 2 characters"),
  author_email: z.string().email("Please enter a valid email address"),
  content: z.string().min(10, "Comment must be at least 10 characters"),
});

interface CommentFormProps {
  postId: number;
  type: "comment" | "reply";
  commentId?: number;
  onSuccess?: () => void;
}

export const CommentForm = ({ postId, type, commentId, onSuccess }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author_name: "",
      author_email: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const table = type === "comment" ? "comments" : "replies";
      const data = type === "comment" 
        ? { ...values, post_id: postId, approval: 0 }
        : { ...values, comment_id: commentId, approval: 0 };

      const { error } = await supabase.from(table).insert([data]);

      if (error) {
        console.error(`Error submitting ${type}:`, error);
        throw error;
      }

      toast({
        title: "Success!",
        description: `Your ${type} has been submitted and is awaiting moderation.`,
      });

      form.reset();
      if (onSuccess) onSuccess();
      
      // Invalidate queries to refresh the comments list
      await queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      await queryClient.invalidateQueries({ queryKey: ["replies", postId] });
    } catch (error) {
      console.error(`Error in ${type} submission:`, error);
      toast({
        title: "Error",
        description: `Failed to submit your ${type}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`Write your ${type} here...`}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit {type}
        </Button>
      </form>
    </Form>
  );
};