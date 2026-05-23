import { useDashboardData } from "./hooks/useDashboardData";
import { Header } from "./components/Header";
import { Predictor } from "./components/Predictor";
import { MetricsSection } from "./components/MetricsSection";
import { ModelComparison } from "./components/ModelComparison";
import { FeatureImportance } from "./components/FeatureImportance";
import { DatasetInfo } from "./components/DatasetInfo";
import { Footer } from "./components/Footer";
import { SectionReveal } from "./components/ui/SectionReveal";

function Skeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-white/[0.03]" />
        <div className="h-8 w-64 animate-pulse rounded-lg bg-white/[0.03]" />
        <div className="h-4 w-48 animate-pulse rounded-lg bg-white/[0.03]" />
        <div className="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Skeleton />;

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">⚠️</div>
          <p className="text-lg text-danger">{error || "No se pudieron cargar los datos"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="flex flex-col gap-20 pb-12">
        <SectionReveal>
          <Predictor />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <MetricsSection data={data} />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid gap-6 lg:grid-cols-2">
            <ModelComparison data={data} />
            <FeatureImportance data={data} />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <DatasetInfo data={data} />
        </SectionReveal>
      </div>

      <Footer />
    </div>
  );
}

export default App;
