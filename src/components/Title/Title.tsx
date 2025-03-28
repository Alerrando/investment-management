import React from "react";

interface TitleProps {
  name: string;
  icon: React.ReactNode;
}

export default function Title({ name, icon }: TitleProps) {
  return (
    <header className="flex items-center gap-3">
      {icon}
      <h2 className="text-lg font-semibold text-primary-t md:text-xl">{name}</h2>
    </header>
  );
}
