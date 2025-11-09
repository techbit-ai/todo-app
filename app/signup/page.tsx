import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signup } from "@/actions/auth/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default async function SignUpPage() {
  // ✅ Await createClient because cookies() is async in Next.js 15
  const supabase = await createClient();

  // ✅ Get currently signed-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to create a new account.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {/* ✅ The signup server action is triggered automatically on submit */}
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" required type="password" />
            </div>

            {/* ✅ This line actually connects to your server action */}
            <Button formAction={signup} className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Link className="text-sm underline" href="/signin">
            Already have an account? Sign In
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
