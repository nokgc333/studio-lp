"use client";

import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/layout/container";

import {
  PERSONA_HUMAN_IMAGE,
  PERSONA_ITEMS,
  PERSONA_TITLE,
} from "./persona-content";
import { SectionTitle } from "./section-title";

const STRIP_CLASS =
  "relative h-[103px] w-full bg-[url(/images/placeholder/persona-strip.svg)] bg-[length:auto_100%] bg-repeat-x p-0 motion-safe:animate-strip-slide le768:h-[53px] le768:motion-safe:animate-strip-slide-slow";

const SWITCH_CLASS =
  "relative inline-block h-[30px] min-w-[50px] cursor-pointer rounded-[15px] bg-switch-off shadow-[inset_0_0_6px_0_rgba(0,0,0,0.251)] has-[:checked]:bg-switch-on has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[Highlight] motion-safe:transition-colors motion-safe:duration-[400ms] after:absolute after:top-1/2 after:left-[5px] after:h-[22px] after:w-[22px] after:-translate-y-1/2 after:rounded-full after:bg-paper after:shadow-[0_0_3px_0_rgba(0,0,0,0.251)] after:content-[''] has-[:checked]:after:left-[25px] motion-safe:after:transition-[left] motion-safe:after:duration-[400ms]";

const CIRCLE_CLASS =
  "z-10 h-[117px] w-[117px] motion-safe:transition-opacity motion-safe:duration-500 le768:h-[94px] le768:w-[94px]";

/** The circles sit two to a row, left and right of the person. */
const CIRCLE_ROWS = [PERSONA_ITEMS.slice(0, 2), PERSONA_ITEMS.slice(2, 4)];

export function PersonaSection() {
  const [isOn, setIsOn] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setIsOn((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section
      id="persona"
      className="relative bg-surface pt-20 pb-[120px] le768:pt-[52px] le768:pb-[60px]"
    >
      <div data-strip aria-hidden="true" className={STRIP_CLASS} />
      <Container>
        <SectionTitle className="absolute top-[120px] right-0 left-0 le768:top-[60px]">
          {PERSONA_TITLE}
        </SectionTitle>
        <div
          data-contents
          className="mt-[60px] flex rounded-2xl shadow-[0_0_30px_0_rgba(0,0,0,0.102)] le768:mt-[27px] le768:flex-col-reverse"
        >
          <div className="w-1/2 rounded-[16px_0_0_16px] bg-paper p-[3.25rem] le768:w-full le768:rounded-[0_0_16px_16px] le575:p-5">
            {PERSONA_ITEMS.map((item) => (
              <div
                key={item.id}
                className="mt-7 flex items-center first:mt-0 le768:mt-5 le768:justify-between"
              >
                <div
                  id={`${item.id}-label`}
                  className="mr-5 text-left text-[clamp(1.125rem,_1.081rem_+_0.1878vw,_1.25rem)] leading-[1.45] font-bold tracking-[0.1em]"
                >
                  {item.label}
                </div>
                <label htmlFor={item.id} className={SWITCH_CLASS}>
                  <input
                    id={item.id}
                    type="checkbox"
                    aria-labelledby={`${item.id}-label`}
                    checked={Boolean(isOn[item.id])}
                    onChange={() => toggle(item.id)}
                    className="sr-only"
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="relative flex w-1/2 flex-col items-center justify-between rounded-[0_16px_16px_0] bg-[linear-gradient(180.42deg,var(--color-primary)_-19.01%,var(--color-secondary)_50.12%,var(--color-highlight)_116.04%)] px-10 py-[1.3rem] le768:h-[251px] le768:w-full le768:rounded-[16px_16px_0_0] le768:px-[18px] le768:pt-[22px] le768:pb-[21px]">
            <div
              data-human
              className="absolute bottom-0 left-1/2 w-[122px] -translate-x-1/2 le768:w-24"
            >
              <Image
                src={PERSONA_HUMAN_IMAGE}
                alt=""
                width={244}
                height={574}
                unoptimized
              />
            </div>
            {CIRCLE_ROWS.map((row) => (
              <div
                key={row[0].id}
                className="flex w-full justify-between le768:w-4/5 le375:w-full"
              >
                {row.map((item) => (
                  <div
                    key={item.id}
                    data-circle
                    className={`${CIRCLE_CLASS} ${
                      isOn[item.id] ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={item.circle}
                      alt=""
                      width={117}
                      height={117}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
