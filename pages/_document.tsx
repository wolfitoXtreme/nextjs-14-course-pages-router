// import Document, { Head, Html, Main, NextScript } from 'next/document';

// class RootDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//           <div data-id="notifications"></div>
//         </body>
//       </Html>
//     );
//   }
// }

// export default RootDocument;

import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div data-id="notifications" />
      </body>
    </Html>
  );
}
