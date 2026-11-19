import { StoryEditor } from "@/components/admin/StoryEditor";

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">New story</h1>
      <div className="mt-8">
        <StoryEditor />
      </div>
    </div>
  );
}
