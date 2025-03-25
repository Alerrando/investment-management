"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hexToHsl, hslToHex } from "@/lib/utils";

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  primaryT: string;
  card: string;
  border: string;
  skeleton: string;
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [customColors, setCustomColors] = useState<Colors>({
    primary: "",
    secondary: "",
    background: "",
    primaryT: "",
    card: "",
    border: "",
    skeleton: "",
  });
  const [activeColorType, setActiveColorType] = useState<
    "primary" | "secondary" | "background" | "primaryT" | "card" | "border"
  >("primary");

  useEffect(() => {
    if (localStorage.getItem("customColors") && theme === "custom") {
      setTheme("custom");
      const aux = JSON.parse(localStorage.getItem("customColors") || "");
      addValuesToCustomColors(aux);
    } else {
      const aux = handleThemeChangeSetCustomCulor();
      setCustomColors(aux);
    }
  }, []);

  useEffect(() => {
    console.log("Custom Colors Updated: ", customColors);
  }, [customColors]);

  function addValuesToCustomColors(values: Colors) {
    const root = document.documentElement;
    root.style.setProperty("--primary", hexToHsl(values.primary));
    root.style.setProperty("--secondary", hexToHsl(values.secondary));
    root.style.setProperty("--background", hexToHsl(values.background));
    root.style.setProperty("--primary-t", hexToHsl(values.primaryT));
    root.style.setProperty("--card", hexToHsl(values.card));
    root.style.setProperty("--border", hexToHsl(values.border));
    root.style.setProperty("--skeleton", hexToHsl(values.skeleton));

    localStorage.setItem("customColors", JSON.stringify(values));
    setCustomColors(values);
  }

  function removeValuesFromCustomColors() {
    const root = document.documentElement;
    root.style.removeProperty("--primary");
    root.style.removeProperty("--secondary");
    root.style.removeProperty("--background");
    root.style.removeProperty("--primary-t");
    root.style.removeProperty("--card");
    root.style.removeProperty("--border");
    root.style.removeProperty("--skeleton");
    root.classList.remove("custom");
  }

  function handleThemeChangeSetCustomCulor() {
    const style = window.getComputedStyle(document.body);
    const value: Colors = {
      primary: hslToHex(style.getPropertyValue("--primary")),
      secondary: hslToHex(style.getPropertyValue("--secondary")),
      background: hslToHex(style.getPropertyValue("--background")),
      primaryT: hslToHex(style.getPropertyValue("--primary-t")),
      card: hslToHex(style.getPropertyValue("--card")),
      border: hslToHex(style.getPropertyValue("--border")),
      skeleton: hslToHex(style.getPropertyValue("--skeleton")),
    };

    return value;
  }

  const applyCustomTheme = (aux: Colors) => {
    setTheme("custom");
    addValuesToCustomColors(aux);
  };

  const handleThemeChange = (themeChange: string) => {
    if (themeChange !== "custom") removeValuesFromCustomColors();
    setTheme(themeChange);
    const aux = handleThemeChangeSetCustomCulor();
    setCustomColors(aux);
  };

  const handleCustomColorChange = (color: string) => {
    const aux: Colors = { ...handleThemeChangeSetCustomCulor(), [activeColorType]: color };
    applyCustomTheme(aux);
  };

  const handleHexInputChange = (value: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      handleCustomColorChange(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-border bg-primary" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem] text-primary-t" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-background sm:w-96">
        <Tabs defaultValue="predefined">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="predefined" className="text-primary-t data-[state=active]:text-primary-t">
              Pré-definidos
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-primary-t data-[state=active]:text-primary-t">
              Personalizados
            </TabsTrigger>
          </TabsList>
          <TabsContent value="predefined">
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="cursor-pointer" onClick={() => handleThemeChange("light")}>
                <img src="/light-theme-preview.png" alt="Light Theme" className="rounded-lg" />
                <p className="mt-2 text-center text-primary-t">Branco</p>
              </div>
              <div className="cursor-pointer" onClick={() => handleThemeChange("dark")}>
                <img src="/dark-theme-preview.png" alt="Dark Theme" className="rounded-lg" />
                <p className="mt-2 text-center text-primary-t">Dark</p>
              </div>
              <div className="cursor-pointer" onClick={() => handleThemeChange("blue")}>
                <img src="/blue-theme-preview.png" alt="Blue Theme" className="rounded-lg" />
                <p className="mt-2 text-center text-primary-t">Dark Azul</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeColorType === "primary" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "primary" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("primary")}
                >
                  Primária
                </Button>
                <Button
                  variant={activeColorType === "secondary" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "secondary" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("secondary")}
                >
                  Secundária
                </Button>
                <Button
                  variant={activeColorType === "background" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "background" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("background")}
                >
                  Fundo
                </Button>
                <Button
                  variant={activeColorType === "primaryT" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "primaryT" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("primaryT")}
                >
                  Texto
                </Button>
                <Button
                  variant={activeColorType === "card" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "card" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("card")}
                >
                  Card
                </Button>
                <Button
                  variant={activeColorType === "border" ? "default" : "outline"}
                  className={`rounded-lg ${activeColorType === "border" ? "bg-card text-primary-t hover:bg-card/70" : ""} text-primary-t hover:bg-card/40 hover:text-primary-t`}
                  onClick={() => setActiveColorType("border")}
                >
                  Borda
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-primary-t">
                  Cor {activeColorType === "primaryT" ? "Texto" : activeColorType}
                </label>
                <HexColorPicker
                  color={customColors[activeColorType]}
                  onChange={handleCustomColorChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-primary-t">Valor Hexadecimal</label>
                <Input
                  type="text"
                  value={customColors[activeColorType]}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  className="w-full text-primary-t"
                  placeholder="#000000"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
