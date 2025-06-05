import AppLayoutAdmin from "@/layouts/admin/app-layout-admin";
import { Head } from "@inertiajs/react";

const breadcrumbs = [
    {
        title: "Admin Dashboard",
        href: "/admin/dashboard",
    },
];

export default function AdminDashboard() {
    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="bg-white flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* Placeholder for content */}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* Placeholder for content */}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* Placeholder for content */}
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {/* Placeholder for content */}
                </div>
            </div>
        </AppLayoutAdmin>
    );
}