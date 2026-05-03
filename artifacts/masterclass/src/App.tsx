import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { CourseLanding } from "@/pages/CourseLanding";
import { LessonPage } from "@/pages/LessonPage";
import { useProgress } from "@/hooks/useProgress";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppLayout() {
  const {
    completedLessons,
    completedCount,
    lastVisitedLesson,
    markComplete,
    markIncomplete,
    setLastVisited,
    isCompleted,
  } = useProgress();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        completedLessons={completedLessons}
        completedCount={completedCount}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Switch>
          <Route path="/">
            {() => (
              <CourseLanding
                completedCount={completedCount}
                completedLessons={completedLessons}
                lastVisitedLesson={lastVisitedLesson}
              />
            )}
          </Route>

          <Route path="/lesson/:id">
            {(params: { id: string }) => (
              <LessonPage
                lessonId={params.id}
                isCompleted={isCompleted}
                markComplete={markComplete}
                markIncomplete={markIncomplete}
                setLastVisited={setLastVisited}
              />
            )}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
