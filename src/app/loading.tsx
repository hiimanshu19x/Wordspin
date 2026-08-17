export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-3 bg-muted p-6 rounded-2xl animate-pulse">
        <div className="w-12 h-1.5 bg-foreground/10 rounded-full" />
        <div className="w-8 h-1.5 bg-foreground/10 rounded-full" />
        <div className="w-10 h-1.5 bg-foreground/10 rounded-full" />
      </div>
    </div>
  );
}
