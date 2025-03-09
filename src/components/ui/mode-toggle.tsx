"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  primaryT: string;
  card: string;
  border: string;
}

function hexToHsl(hex: string): string {
  hex = hex.replace(/^#/, "");

  // Converte para RGB
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  // Converte RGB para HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [customColors, setCustomColors] = useState<Colors>({
    primary: "#000000",
    secondary: "#ffffff",
    background: "#ffffff",
    primaryT: "#000000",
    card: "#f0f0f0",
    border: "#cccccc",
  });
  const [nowThemeColors, setNowThemeColors] = useState<Colors>({
    primary: "#000000",
    secondary: "#ffffff",
    background: "#ffffff",
    primaryT: "#000000",
    card: "#f0f0f0",
    border: "#cccccc",
  });
  const [activeColorType, setActiveColorType] = useState<
    "primary" | "secondary" | "background" | "primaryT" | "card" | "border"
  >("primary");

  useEffect(() => {
    const root = document.documentElement;
    setNowThemeColors({
      primary: root.style.getPropertyValue("--primary"),
      secondary: root.style.getPropertyValue("--secondary"),
      background: root.style.getPropertyValue("--background"),
      primaryT: root.style.getPropertyValue("--primaryT"),
      card: root.style.getPropertyValue("--card"),
      border: root.style.getPropertyValue("--border"),
    });
  }, []);

  function addValuesToCustomColors(values: Colors) {
    const root = document.documentElement;
    root.style.setProperty("--primary", hexToHsl(values.primary));
    root.style.setProperty("--secondary", hexToHsl(values.secondary));
    root.style.setProperty("--background", hexToHsl(values.background));
    root.style.setProperty("--primaryT", hexToHsl(values.primaryT));
    root.style.setProperty("--card", hexToHsl(values.card));
    root.style.setProperty("--border", hexToHsl(values.border));
  }

  const applyCustomTheme = () => {
    setTheme("custom");
    addValuesToCustomColors(nowThemeColors);
    addValuesToCustomColors(customColors);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setTheme(theme);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [activeColorType]: color,
    }));

    applyCustomTheme();
  };

  const handleHexInputChange = (value: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      handleCustomColorChange(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem] text-black" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-background">
        <Tabs defaultValue="predefined">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined" className="text-primary-t data-[state=active]:text-primary-t">
              Pré-definidos
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-primary-t data-[state=active]:text-primary-t">
              Personalizados
            </TabsTrigger>
          </TabsList>
          <TabsContent value="predefined">
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="cursor-pointer" onClick={() => handleThemeChange("light")}>
                <img src="/light-theme-preview.png" alt="Light Theme" className="rounded-lg" />
                <p className="mt-2 text-center">Light</p>
              </div>
              <div className="cursor-pointer" onClick={() => handleThemeChange("dark")}>
                <img src="/dark-theme-preview.png" alt="Dark Theme" className="rounded-lg" />
                <p className="mt-2 text-center">Dark</p>
              </div>
              <div className="cursor-pointer" onClick={() => handleThemeChange("blue")}>
                <img src="/blue-theme-preview.png" alt="Blue Theme" className="rounded-lg" />
                <p className="mt-2 text-center">Dark Blue</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="mt-4 space-y-4">
              {/* Seletor de Tipo de Cor */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeColorType === "primary" ? "default" : "outline"}
                  onClick={() => setActiveColorType("primary")}
                >
                  Primária
                </Button>
                <Button
                  variant={activeColorType === "secondary" ? "default" : "outline"}
                  onClick={() => setActiveColorType("secondary")}
                >
                  Secundária
                </Button>
                <Button
                  variant={activeColorType === "background" ? "default" : "outline"}
                  onClick={() => setActiveColorType("background")}
                >
                  Fundo
                </Button>
                <Button
                  variant={activeColorType === "primaryT" ? "default" : "outline"}
                  onClick={() => setActiveColorType("primaryT")}
                >
                  Texto
                </Button>
                <Button
                  variant={activeColorType === "card" ? "default" : "outline"}
                  onClick={() => setActiveColorType("card")}
                >
                  Card
                </Button>
                <Button
                  variant={activeColorType === "border" ? "default" : "outline"}
                  onClick={() => setActiveColorType("border")}
                >
                  Borda
                </Button>
              </div>

              {/* Seletor de Cor */}
              <div className="space-y-2">
                <label className="text-primary-t">Cor {activeColorType}</label>
                <HexColorPicker
                  color={customColors[activeColorType]}
                  onChange={handleCustomColorChange}
                  className="w-full"
                />
              </div>

              {/* Input de Hexadecimal */}
              <div className="space-y-2">
                <label className="text-primary">Valor Hexadecimal</label>
                <Input
                  type="text"
                  value={customColors[activeColorType]}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  className="w-full"
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
