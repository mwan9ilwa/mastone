import { Loader2 } from "lucide-react";

/** Pages read the session cookie and the database, so each one streams in behind this at request time. */
export default function Loading() {
  return (
    <div className="grid h-64 place-items-center text-muted-foreground">
      <Loader2 className="animate-spin" />
    </div>
  );
}
