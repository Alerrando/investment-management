"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AnimatePresence>
        <motion.div
          key="theme-loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      storageKey="theme"
      defaultTheme="light"
      themes={["light", "dark", "blue", "custom"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
