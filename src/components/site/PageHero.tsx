import type React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlueVisualFrame } from "./BlueVisualFrame";

export function PageHero(props: {
  title: React.ReactNode;
  desc: React.ReactNode;
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
  visualSrc: string;
  visualPos?: string;
}) {
  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
            {props.title}
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">{props.desc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={props.primaryHref}>
              <Button className="rounded-full px-8">{props.primaryText}</Button>
            </Link>
            <Link to={props.secondaryHref}>
              <Button
                variant="outline"
                className="rounded-full px-8 bg-white/70"
              >
                {props.secondaryText}
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <BlueVisualFrame
            src={props.visualSrc}
            pos={props.visualPos}
            className="h-[360px]"
          />
        </div>
      </div>
    </section>
  );
}

