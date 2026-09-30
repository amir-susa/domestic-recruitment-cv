// CV_v3/src/App.tsx 
import React from "react";
import { FormPageOne } from "./components/FormPageOne";
import { FormPageTwo } from "./components/FormPageTwo";

export default function App() {
  return (
    <main className="min-h-screen w-full overflow-x-auto bg-neutral-300 py-10">
      <div className="flex min-w-max flex-col items-center gap-10 px-6">
        <FormPageOne />
        <FormPageTwo />
      </div>
    </main>);

}