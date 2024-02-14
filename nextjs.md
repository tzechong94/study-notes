# NextJS

1. If components are async, they are server components. Code block will run once on the server to generate the HTML code, then sent to frontend to be rendered.
2. TSRAFCE -> react component boilerplate
3. if using useState function, 'use client' at the top. Basically any client side rendering components.
4. under app, create folder api/create-chat/route.ts -> means that /api/create-chat is an endpoint that can be called