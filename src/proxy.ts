import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || "smomo_secret_key_2026" })
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // ==========================================
  // 1. SUBDOMAIN ROUTING (توجيه النطاقات)
  // ==========================================
  
  const isSellerArea = hostname === 'seller-area.smomo.shop'
  const isStorefront = hostname === 'smomo.shop' || hostname === 'www.smomo.shop'
  
  // إذا كان الزائر يتصفح المتجر الأساسي (smomo.shop)
  if (isStorefront) {
    // توجيه الصفحة الرئيسية (/) لتظهر صفحة المتجر بدلاً من لوحة التحكم
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/store', request.url))
    }
    
    // منع الوصول لمسارات لوحة تحكم الإدارة من رابط المتجر
    const adminRoutes = ['/products', '/orders', '/customers', '/marketing', '/invoices', '/insights', '/settings', '/apps']
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', request.url)) // إعادة توجيه للرئيسية
    }
  }

  // إذا كان الزائر يتصفح لوحة التحكم (seller-area.smomo.shop)
  if (isSellerArea) {
    // منع الوصول للمتجر من رابط لوحة التحكم وتوجيهه للرئيسية (لوحة التحكم)
    if (pathname.startsWith('/store')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // ==========================================
  // 2. AUTHENTICATION (حماية المسارات)
  // ==========================================

  // حماية لوحة تحكم الزبون
  if (pathname.startsWith('/store/dashboard')) {
    if (!token) {
      const url = new URL('/store/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, svg, etc
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
