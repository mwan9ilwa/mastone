import {
  Award,
  Building2,
  Cog,
  Droplet,
  Factory,
  Fuel,
  HardHat,
  Headset,
  Package,
  Pickaxe,
  ShieldCheck,
  Sprout,
  Tractor,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/content/schema";

/** Icons the dashboard can assign to services and industries. Add to `iconNames` in the schema too. */
export const contentIcons: Record<IconName, LucideIcon> = {
  Truck,
  Headset,
  Wrench,
  Package,
  Droplet,
  ShieldCheck,
  Building2,
  Pickaxe,
  Sprout,
  Zap,
  Factory,
  Tractor,
  Fuel,
  Cog,
  HardHat,
  Award,
};

export function ContentIcon({ name, ...props }: { name: IconName } & React.ComponentProps<LucideIcon>) {
  const Icon = contentIcons[name] ?? Award;
  return <Icon {...props} />;
}
