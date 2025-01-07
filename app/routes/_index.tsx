import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "envify" },
    { name: "description", content: "Keep your secrets" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      testing works
    </div>
  );
}
