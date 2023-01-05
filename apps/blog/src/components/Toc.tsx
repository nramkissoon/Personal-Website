import { Section } from "./SectionProvider";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

function NavLink({ href, active, isAnchorLink = false, children }: any) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition w-fit",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
    >
      <span className="truncate">{children}</span>
    </Link>
  );
}

export const Toc = (props: { slug: string; sections: Section[] }) => {
  return (
    <ul role="list" className="border-l border-transparent">
      <motion.li layout="position" className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          {props.sections.length > 0 && (
            <motion.ul
              role="list"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.1 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
            >
              {props.sections.map((section: any) => (
                <li key={section.id}>
                  <NavLink
                    href={`/posts/${props.slug}#${section.id}`}
                    isAnchorLink
                  >
                    {section.title}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.li>
    </ul>
  );
};
