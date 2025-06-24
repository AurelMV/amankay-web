import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Welcome from './pages/welcome';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

interface InertiaAppProps {
    el: HTMLElement;
    App: React.ComponentType<any>;
    props: Record<string, unknown>;
}

interface InertiaProgressOptions {
    color: string;
}

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }: InertiaAppProps) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    } as InertiaProgressOptions,
});

// This will set light / dark mode on load...
initializeTheme();

