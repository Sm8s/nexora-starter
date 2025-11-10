@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
body { @apply bg-neutral-950 text-neutral-100; }
a { @apply underline underline-offset-4; }
.container { @apply max-w-5xl mx-auto px-4; }
.card { @apply rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 shadow-lg p-6; }
