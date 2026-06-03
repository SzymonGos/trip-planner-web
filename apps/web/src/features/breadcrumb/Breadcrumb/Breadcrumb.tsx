'use client';

import React from 'react';
import Link from 'next/link';
import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Container } from '@/components/Container/Container';
import cx from 'classnames';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type TBreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const BreadcrumbComponent: React.FC<TBreadcrumbProps> = ({ items, className = '' }) => (
  <div className={cx('sticky top-[84px] bg-tp-white-100 z-40 py-3', className)}>
    <Container>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="truncate max-w-[150px]">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  </div>
);
