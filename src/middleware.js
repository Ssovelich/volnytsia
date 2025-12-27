import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';

  // 1. Головна логіка для самого шляху /admin
  if (pathname === '/admin') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/awards', request.url));
    } else {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Якщо спроба зайти в будь-яку частину /admin/* без токена (крім логіна)
  if (!token && pathname.startsWith('/admin') && !isLoginPage) {
    return NextResponse.next(); // Можна додати редірект на логін, якщо хочете жорсткий захист:
    // return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 3. Захист: не пускати неавторизованих на внутрішні сторінки
  if (!token && pathname.startsWith('/admin') && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 4. Якщо користувач вже залогінений і намагається зайти на сторінку логіна
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/awards', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Додаємо '/admin', щоб middleware ловив і сам корінь, і підшляхи
  matcher: ['/admin', '/admin/:path*'],
};