import AppSidebarAdminLayout from '@/layouts/app/app-sidebar-admin-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutAdminProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutAdminProps) => (
    <AppSidebarAdminLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppSidebarAdminLayout>
);