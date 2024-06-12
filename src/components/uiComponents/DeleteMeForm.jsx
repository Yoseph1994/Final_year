"use client";
import { deleteAccount, signUserOut } from "@/lib/actions/users";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Spinner from "./Spinner";
function DeleteMeForm() {
  const [state, formAction] = useFormState(deleteAccount, null);
  const { replace } = useRouter();
  useEffect(() => {
    if (state?.success) {
      signUserOut();
    }
  }, [state]);
  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className="my-2 ml-auto col-span-6 w-full duration-300 bg-red-500 text-white hover:bg-red-600"
      >
        {pending ? <Spinner height={30} /> : "Temporary Delete account"}
      </Button>
    );
  };
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="purpose" />
        <Submit />
      </form>
    </>
  );
}

export default DeleteMeForm;
