import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import { Editor } from "../editor";
import { ActionTooltip } from "../action-tooltip";
import { Checkbox } from "../ui/checkbox";
import { Loader2, Scale } from "lucide-react";

const AddRuleFormSchema = z.object({
  rule: z.string().min(1, {
    message: "Can't be empty.",
  }),
  isProtected: z.boolean().default(false),
});

export const AddRuleModal = () => {
  const { onClose, isOpen, type } = useModal();

  const isModalOpen = isOpen && type === "addRule";

  const router = useRouter();

  const form = useForm<z.infer<typeof AddRuleFormSchema>>({
    resolver: zodResolver(AddRuleFormSchema),
    defaultValues: {
      rule: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof AddRuleFormSchema>) => {
    try {
      const valuesToSend = {
        rule: values.rule,
        isProtected: values.isProtected,
      };

      await axios.post("/api/code-of-conduct", valuesToSend);

      form.reset();
      router.refresh();
      toast.success("Added rule successfully.");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            <span>Something went wrong!</span>
          </div>
        );
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-xl md:min-w-[70%] w-11/12 p-3 md:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-baseline gap-2 mx-auto text-lg dark:text-zinc-300 sm:text-3xl">
            Add a rule
            <Scale />
          </DialogTitle>

          <DialogDescription className="mx-auto text-xs">
            Add a rule that makes MalishaEdu a better place to be.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 relative"
            >
              <div className="flex flex-col md:gap-3">
                <FormField
                  control={form.control}
                  name="rule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="!text-sm">
                        <span className="text-red-500">* </span>
                        Write a rule with proper clarification
                      </FormLabel>

                      <FormControl>
                        <Editor
                          {...field}
                          placeholder="Set the tone for a positive and chill environment and create guidelines that make teamwork actually work..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <Button
                disabled={isLoading}
                type="submit"
                variant={"myButtons"}
                className="w-full py-1 !mt-6 text-sm font-semibold border-2 rounded-none cursor-pointer md:py-2 border-zinc-700 md:text-lg md:hover:bg-black active:bg-black"
              >
                Add
                {isLoading && (
                  <Loader2 className="w-3 h-3 md:h-4 md:w-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
