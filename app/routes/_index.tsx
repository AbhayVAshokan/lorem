import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, json, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Button from "~/components/button";
import { generateLoremIpsum } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Lorem ipsum generator" },
    {
      name: "description",
      content:
        "Generate lorem ipsum text for your website by specifying the number of paragraphs.",
    },
    { name: "keywords", content: "lorem ipsum generator, remix-run" },
    { property: "og:title", content: "Lorem ipsum generator" },
    {
      property: "og:description",
      content:
        "Generate lorem ipsum text for your website by specifying the number of paragraphs.",
    },
    { property: "og:image", content: "https://lorem.abhay.app/cover.png" },
    { property: "twitter:title", content: "Lorem ipsum generator" },
    {
      property: "twitter:description",
      content:
        "Generate lorem ipsum text for your website by specifying the number of paragraphs.",
    },
    { property: "twitter:creator:id", content: "@abhayvashokan" },
    { property: "twitter:site", content: "@abhayvashokan" },
    { property: "twitter:image", content: "https://lorem.abhay.app/cover.png" },
    { property: "twitter:card", content: "summary_large_image" },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const n = searchParams.get("n") || 1;
  return json({ n, paragraphs: generateLoremIpsum(n) });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const n = formData.get("n");
  const paragraphs = generateLoremIpsum(n);
  return json({ paragraphs });
};

const Index = () => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const { n, paragraphs } = useLoaderData<typeof loader>();

  const handleCopy = () => {
    if (!ref.current) return;
    navigator.clipboard.writeText(ref.current.innerHTML);
    toast.success("Copied to clipboard.");
  };

  useEffect(() => {
    handleCopy();
  }, [n]);

  return (
    <main className="max-w-6xl mx-auto text-lg px-8 flex flex-col h-screen">
      <header className="top-0 sticky z-20 p-4 mb-4">
        <h1> Lorem Ipsum generator</h1>
      </header>

      <section className="max-w-4xl mx-auto flex flex-col justify-center h-[calc(100%-5rem)]">
        <div className="space-y-6 bg-zinc-100 dark:bg-zinc-900 p-8 pt-16 rounded-md relative overflow-auto">
          <div className="flex absolute top-8 left-0 px-8 justify-between w-full">
            <Form role="search" className="flex justify-between">
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
            <Button
              style="secondary"
              disabled={navigation.state === "loading"}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </div>

          <div ref={ref} className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
