import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import PyscnCard from "@/components/PyscnCard";

/**
 * Anchors are rewritten so internal links stay client-side and external ones
 * always open safely, without every post having to remember the attributes.
 */
const components = {
	PyscnCard,
	a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
		if (href.startsWith("/")) {
			return <Link href={href} {...props} />;
		}
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props} />
		);
	},
};

export default function PostBody({ source }: { source: string }) {
	return (
		<div className="post-body prose prose-slate max-w-none">
			<MDXRemote
				source={source}
				components={components}
				options={{
					mdxOptions: {
						// Tables, strikethrough and autolinks. Without this, a markdown
						// table renders as one paragraph of literal pipe characters,
						// which is how the first post to use one shipped.
						remarkPlugins: [remarkGfm],
						rehypePlugins: [
							// Dark theme to match the dark code surfaces used elsewhere on
							// the site; keepBackground: false lets our own CSS own the block.
							[
								rehypePrettyCode,
								{ theme: "github-dark", keepBackground: false },
							],
						],
					},
				}}
			/>
		</div>
	);
}
