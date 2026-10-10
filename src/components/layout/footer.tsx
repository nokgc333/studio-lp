import Image from "next/image";

import { Container } from "./container";
import { COPYRIGHT_TEXT, PAGE_LINKS, SOCIAL_LINKS } from "./footer-content";
import type { FooterLink } from "./footer-content";

const GRADIENT =
  "bg-[linear-gradient(167.79deg,var(--color-primary)_19.74%,var(--color-secondary)_49.56%,var(--color-highlight)_77.99%)]";

const LIST_CLASS =
  "flex gap-10 px-10 le991:px-0 le991:py-8 le575:grid le575:w-[79%] le575:grid-cols-2 le575:gap-5 le575:text-left le375:w-full le375:grid-cols-[0.5fr_1fr] le375:py-7";

/** A thin line before the list: upright from 992px, across the top below. */
const DIVIDER_CLASS =
  "relative before:absolute before:top-0 before:left-0 before:h-[23px] before:w-px before:bg-paper before:content-[''] le991:before:h-px le991:before:w-full";

function LinkList({
  links,
  className,
}: {
  links: readonly FooterLink[];
  className: string;
}) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer
      className={`${GRADIENT} w-full pt-20 pb-[60px] text-center text-paper le768:py-[3.75rem]`}
    >
      <Container>
        <div className="mx-auto w-[42.5%] min-w-[335px]">
          <Image
            src="/images/placeholder/footer-logo.svg"
            alt=""
            width={425}
            height={30}
            unoptimized
          />
        </div>
        <div className="mt-[3.75rem] flex items-center justify-center le991:flex-col le575:mt-[8.44px] le375:mt-[12.44px]">
          <LinkList links={SOCIAL_LINKS} className={LIST_CLASS} />
          <LinkList
            links={PAGE_LINKS}
            className={`${LIST_CLASS} ${DIVIDER_CLASS}`}
          />
        </div>
        <small className="mt-[3.75rem] block text-[0.75rem] tracking-[0.1em] le575:mt-2 le375:mt-3 le375:text-left">
          {COPYRIGHT_TEXT}
        </small>
      </Container>
    </footer>
  );
}
