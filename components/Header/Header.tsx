'use client';

import {
  HeaderContainer,
  HeaderContent,
  HeaderLeft,
  HeaderNav,
  HeaderNavLink,
  HeaderRight,
  HeaderTitle,
  SidebarToggleButton,
} from './Header.styles';

interface HeaderProps {
  onToggleSidebar?: () => void;
  showToggle?: boolean;
  links?: HeaderLinkItem[];
}

export function Header({
  onToggleSidebar,
  showToggle = false,
  links = headerLinkItems,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLeft>
          {showToggle && (
            <SidebarToggleButton onClick={onToggleSidebar}>
              ☰
            </SidebarToggleButton>
          )}
        </HeaderLeft>
        <HeaderTitle>HJ's Blog</HeaderTitle>
        <HeaderRight>
          <HeaderNav>
            {links.map((linkItem) => (
              <HeaderNavLink
                key={`${linkItem.href}:${linkItem.label}`}
                href={linkItem.href}
                {...(linkItem.isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {linkItem.label}
              </HeaderNavLink>
            ))}
          </HeaderNav>
        </HeaderRight>
      </HeaderContent>
    </HeaderContainer>
  );
}

interface HeaderLinkItem {
  href: string;
  label: string;
  isExternal?: boolean;
}

const headerLinkItems: HeaderLinkItem[] = [
  { href: '/', label: '홈' },
  { href: 'https://github.com/hjlee7856', label: 'GitHub', isExternal: true },
];
