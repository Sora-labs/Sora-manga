import LatestMangas from "@/components/LatestMangas/LatestMangas";

export default async function Home() {
  return (
    <div className="flex flex-col gap-6 mt-12">
      <LatestMangas />
    </div>
  );
}
