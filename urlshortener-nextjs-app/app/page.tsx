import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">URL Shortener</h1>
            <p className="mt-2 text-zinc-600">Sign in or create an account to continue.</p>
          </div>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        <Show when="signed-out">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SignInButton mode="modal">
              <button className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <p className="text-sm text-zinc-600">You are signed in. Click your avatar to manage your profile.</p>
        </Show>
      </div>
    </main>
  );
}
