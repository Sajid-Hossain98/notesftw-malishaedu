"use client";

import { CodeOfConduct, UserData } from "@/types";
import { AddRule } from "./add-rule";
import { Preview } from "@/components/preview";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/editor";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionTooltip } from "@/components/action-tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { motion } from "motion/react";

interface CodeOfConductListProps {
  userData: UserData | null;
  codeOfConduct: CodeOfConduct[];
}

const CodeOfConductListFormSchema = z.object({
  rule: z.string().min(1, {
    message: "Can't be empty.",
  }),
  isProtected: z.boolean().default(false),
});

export const CodeOfConductList = ({
  userData,
  codeOfConduct,
}: CodeOfConductListProps) => {
  // const [isEditing, setIsEditing] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  const toggleEdit = (ruleId: string | null) => {
    setEditingRuleId((current) => (current === ruleId ? null : ruleId));
  };
  const admin = userData?.role === "ADMIN";

  const router = useRouter();

  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof CodeOfConductListFormSchema>>({
    resolver: zodResolver(CodeOfConductListFormSchema),
    defaultValues: {
      rule: "",
      isProtected: false,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CodeOfConductListFormSchema>
  ) => {
    try {
      const valuesToSend = {
        ruleId: editingRuleId,
        rule: values.rule,
        isProtected: values.isProtected,
      };

      await axios.patch("/api/code-of-conduct/", valuesToSend);

      toast.success("Rule Updated!");
      toggleEdit(editingRuleId);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="overflow-y-auto max-h-[65%] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-400/80 pt-2"
    >
      {codeOfConduct.map((rule, index) => {
        return (
          <motion.div
            layout
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 14,
                  mass: 1,
                },
              },
            }}
            key={rule.id}
          >
            {editingRuleId === rule.id ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-baseline gap-2"
                >
                  <div className="flex flex-col w-full md:gap-3">
                    <span className="flex-shrink-0 font-mono md:w-10 w-5 text-right text-base md:text-2xl">
                      {index + 1}.
                    </span>
                    <FormField
                      control={form.control}
                      name="rule"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Editor
                              value={field.value || ""}
                              onChange={field.onChange}
                              placeholder=""
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isProtected"
                      render={({ field }) => (
                        <FormItem className="flex items-baseline gap-2 md:max-h-80">
                          <FormControl>
                            <Checkbox
                              className="border-2 border-emerald-400/70 data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400 transition-all duration-200 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                              id="isProtected"
                              checked={!!field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                            />
                          </FormControl>

                          <ActionTooltip
                            label="Check this box in case there are some rules which you want only the permitted users to see."
                            side="right"
                          >
                            <FormLabel className="!m-0" htmlFor="isProtected">
                              Make it protected?
                            </FormLabel>
                          </ActionTooltip>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="submit"
                      className="!px-2 py-2 flex gap-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black"
                    >
                      Save
                    </button>
                    <button
                      className="!px-2 py-2 flex gap-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black"
                      onClick={() => setEditingRuleId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-start gap-2 md:text-2xl text-base">
                  <span className="flex-shrink-0 my-2 md:my-4 font-mono md:w-10 w-5 text-right text-base md:text-2xl">
                    {index + 1}.
                  </span>
                  <Preview
                    value={rule.rule}
                    className="my-1.5 md:my-3 pr-4 rule-font"
                  />
                </div>

                {admin && (
                  <div className="flex items-start gap-1 mr-1">
                    <button
                      className="px-2 py-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black"
                      onClick={() => {
                        setEditingRuleId(rule.id);
                        form.reset({
                          rule: rule.rule,
                          isProtected: !!rule.isProtected,
                        });
                      }}
                      title="Edit"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>

                    <button
                      className="px-2 py-1 text-xs border border-zinc-400 rounded-[3px] hover:bg-zinc-400 hover:text-black"
                      onClick={() =>
                        onOpen("deleteRule", {
                          ruleId: rule?.id,
                        })
                      }
                      title="Delete"
                    >
                      <Trash className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      })}

      {admin && (
        <div className="py-2 text-center">
          <AddRule />
        </div>
      )}
    </motion.div>
  );
};
