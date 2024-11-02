'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation with roles.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon, roles: ['User', 'vendedor'] },
  { name: 'Facturas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, roles: ['User'] },
  { name: 'Vendedores', href: '/dashboard/customers', icon: UserGroupIcon, roles: ['User'] },
  { name: 'Categorías', href: '/dashboard/categories', icon: ListBulletIcon, roles: ['User'] },
  { name: 'Productos', href: '/dashboard/products', icon: ShoppingCartIcon, roles: ['User'] },
  { name: 'Ventas', href: '/dashboard/sales', icon: CurrencyDollarIcon, roles: ['User', 'Comercio 1' , 'Comercio 2'] },
  { name: 'Comercios', href: '/dashboard/stores', icon: BuildingStorefrontIcon, roles: ['User'] },
];

// Accept a role prop to determine what links to show
export default function NavLinks({ role }: { role: string }) {
  const pathname = usePathname();

  // Filter the links based on the user's role
  const filteredLinks = links.filter((link) => link.roles.includes(role));

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
