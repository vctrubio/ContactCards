import { NextRequest, NextResponse } from 'next/server';

let count = 0;
export function middleware(request: NextRequest) {
  // console.log('hello from middleware ', count++);
  
  const sessionId = request.cookies.get('sessionid')

  // if (request.nextUrl.pathname === '/')
  // {
  //   if (sessionId)
  //     return NextResponse.redirect(new URL('/home', request.url))
  // }

  if (request.nextUrl.pathname === '/home') {
    if (!sessionId)
      return NextResponse.redirect(new URL('/', request.url));
  }


}


export const config = {
  matcher: '/:path*',
};



/*
request.cookies.get/set
response = NextResponse.next()

*/


// export const checkLoginMiddleware = async ({ setUsername, setIsLoggedIn }) => {
//   await checkLoginStatus({
//       setUsername: (username) => {
//           setUsername(username);
//           if (username && username !== 'AnonymousUser_LocalHost') {
//               console.log(`Hello, ${username}`);
//           } else {
//               console.log('Hello, stranger');
//           }
//       },
//       setIsLoggedIn: (isLoggedIn) => {
//           setIsLoggedIn(isLoggedIn);
//           if (!isLoggedIn) {
//               console.log('Hello, stranger');
//           }
//       }
//   });
// };