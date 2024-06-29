import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

 const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const deleteProject = async (projectId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/project/${projectId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast("Project deleted successfully ✅", {
        position: "top-right",
      });
    }

    return res;
  } catch (error: any) {
    toast("Something went wrong ❌", {
      description: error.errorMessage || "An expected error occurred.",
      style: {
        color: "red",
      },
      position: "top-right",
    });
  }
};

const DeleteDialog = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteProject(projectId);

    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full h-full cursor-pointer">Delete</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
