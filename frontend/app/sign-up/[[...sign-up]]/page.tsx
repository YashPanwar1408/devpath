import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400 mb-2">
            Join PrepWise
          </h1>
          <p className="text-gray-400">Start mastering technical interviews today</p>
        </div>
        
        <SignUp 
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl",
            }
          }}
        />
      </div>
    </div>
  );
}
