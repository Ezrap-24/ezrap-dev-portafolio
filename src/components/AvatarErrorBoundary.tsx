"use client";

import { Component, ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export default class AvatarErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Avatar3D failed to render, falling back gracefully:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-[520px] lg:h-[620px] flex items-center justify-center">
            <span style={{ color: "var(--muted)" }} className="text-sm">
              Avatar no disponible
            </span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
