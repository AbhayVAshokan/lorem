import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import Button from "~/components/button";

// TODO: Update the meta information.
export const meta: MetaFunction = () => {
  return [
    { title: "Lorem ipsum generator" },
    { name: "description", content: "" },
  ];
};

const DEFAULT_PARAGRAPHS = [
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum nulla ad semper finibus bibendum. Volutpat ultricies metus per massa lobortis massa magna risus. Quisque pellentesque tincidunt malesuada; metus viverra tellus. Dignissim euismod dui tortor tortor nostra euismod ac nisi. Elit nisl gravida eget sollicitudin arcu ex. Arcu tortor tempus potenti rhoncus sollicitudin porttitor justo.",
];

export const loader = ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const n = searchParams.get("n") || 1;
  return json({ n, paragraphs: DEFAULT_PARAGRAPHS });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const n = formData.get("n");
  // TODO: Make this a function call that accepts `n` and returns `n` number of
  // lorem ipsum paragraphs.
  const paragraphs = ["Lorem ipsum", "sit amet"];
  return json({ paragraphs });
};

const Index = () => {
  const { n, paragraphs } = useLoaderData<typeof loader>();

  const handleCopy = () => {
    // TODO: Toast promise looks cool.
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 2000)
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        return "Copied to clipboard.";
      },
      error: "Error",
    });
  };

  useEffect(() => {
    // TODO: Is this working?
    toast.success("Copied to clipboard.");
  }, []);

  return (
    <main className="max-w-6xl mx-auto text-lg px-8 flex flex-col h-screen">
      <header className="top-0 sticky z-20 p-4 mb-4">
        <h1> Lorem Ipsum generator</h1>
      </header>

      <section className="max-w-4xl mx-auto flex flex-col justify-center h-[calc(100%-5rem)]">
        <div className="space-y-6 bg-zinc-100 dark:bg-zinc-900 p-8 pt-16 rounded-md relative overflow-auto">
          <div className="flex absolute top-8 left-0 px-8 justify-between w-full">
            <Form method="POST" className="flex justify-between">
              <div className="flex gap-2">
                <input
                  required
                  autoComplete="false"
                  name="n"
                  defaultValue={n}
                  step="1"
                  pattern="^[0-9]+$"
                  max={99}
                  className="p-2 w-20 text-center text-sm rounded-md"
                />
                <Button style="primary">Generate</Button>
              </div>
            </Form>
            <Button style="secondary" onClick={handleCopy}>
              Copy
            </Button>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
