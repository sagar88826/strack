import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { DatePicker } from "@/shared/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  targetDate: z.string().min(1, "Target date is required"),
});
interface GoalFormProps {
  onAddGoal: (goal: Goal) => void;
}
interface MilestoneInput {
  id: string;
  title: string;
}
export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}
export default function GoalForm({ onAddGoal }: GoalFormProps) {
  const [open, setOpen] = useState(false);
  const [milestones, setMilestones] = useState<MilestoneInput[]>([
    { id: uuidv4(), title: "" },
  ]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      targetDate: "",
    },
  });
  const addMilestone = () => {
    setMilestones([...milestones, { id: uuidv4(), title: "" }]);
  };
  const removeMilestone = (id: string) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id));
    }
  };
  const updateMilestone = (id: string, title: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, title } : m)));
  };
  const onSubmit = form.handleSubmit((data) => {
    const newGoal: Goal = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      targetDate: new Date(data.targetDate),
      progress: 0,
      status: "not-started",
      milestones: milestones
        .filter((m) => m.title.trim() !== "")
        .map((m) => ({
          id: m.id,
          title: m.title,
          completed: false,
        })),
    };
    onAddGoal(newGoal);
    form.reset();
    setMilestones([{ id: uuidv4(), title: "" }]);
    setOpen(false);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 shadow-md 
                     hover:from-slate-100 hover:to-slate-200 transition-all duration-300 ease-out"
        >
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="font-medium">New Goal</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg animate-fadeIn">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold text-slate-800">
            Create New Goal
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Define your goal and break it down into achievable milestones.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Learn a new language"
                      className="border-slate-200 focus:border-slate-300 focus:ring-slate-200 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your goal..."
                      className="min-h-[100px] border-slate-200 focus:border-slate-300 focus:ring-slate-200 transition-all resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-700 font-medium">Target Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date: Date | undefined) =>
                        field.onChange(date?.toISOString())
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-slate-700 font-medium">Milestones</FormLabel>
                <Button
                  type="button"
                  onClick={addMilestone}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <PlusCircle className="w-3 h-3 mr-1" />
                  Add Milestone
                </Button>
              </div>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-2 animate-fadeIn"
                  >
                    <Input
                      placeholder={`Milestone ${index + 1}`}
                      value={milestone.title}
                      onChange={(e) => updateMilestone(milestone.id, e.target.value)}
                      className="flex-1 border-slate-200 focus:border-slate-300 focus:ring-slate-200 transition-all"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMilestone(milestone.id)}
                      disabled={milestones.length === 1}
                      className="h-10 w-10 p-0 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter className="mt-6 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white transition-all duration-300"
              >
                Create Goal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}