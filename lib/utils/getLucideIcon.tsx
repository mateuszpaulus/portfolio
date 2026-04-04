import {
  Zap,
  Palette,
  Component,
  Smartphone,
  Code2,
  Database,
  Globe,
  Server,
  Layers,
  Shield,
  LucideProps,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Zap,
  Palette,
  Component,
  Smartphone,
  Code2,
  Database,
  Globe,
  Server,
  Layers,
  Shield,
}

export function getLucideIcon(name: string): React.ComponentType<LucideProps> {
  return ICON_MAP[name] ?? Code2
}
