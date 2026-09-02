import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countryOptions } from "./types";

interface PhoneInputProps {
  countryValue: string;
  onCountryChange: (value: string) => void;
  numberValue: string;
  onNumberChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({
  countryValue,
  onCountryChange,
  numberValue,
  onNumberChange,
  error,
}: PhoneInputProps) {
  const selected = countryOptions.find((c) => c.value === countryValue) ?? countryOptions[0];

  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
        Phone <span className="font-normal text-muted-foreground">(optional)</span>
      </Label>
      <div className="flex gap-2">
        <Select value={countryValue} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[7.5rem] shrink-0 rounded-xl border-input bg-canvas-soft text-foreground">
            <SelectValue placeholder={selected.label} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {countryOptions.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone"
          type="tel"
          value={numberValue}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="7123 456789"
          className="rounded-xl border-input bg-canvas-soft"
        />
      </div>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
