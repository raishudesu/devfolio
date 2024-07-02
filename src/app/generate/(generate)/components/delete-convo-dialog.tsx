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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const deleteConvo = async (userId: string, conversationId: string) => {
  try {
    const res = await fetch(
      `${apiUrl}/api/ai/user/${userId}/generation/${conversationId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast("Conversation deleted successfully ✅", {
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

const DeleteConvoDialog = ({ conversationId }: { conversationId: string }) => {
  const session = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    await deleteConvo(session.data?.user.id as string, conversationId);
    router.replace("/generate/new");
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
            This action cannot be undone.
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

export default DeleteConvoDialog;
