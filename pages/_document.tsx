// eslint-disable-next-line object-curly-newline
import Document, { Head, Html, Main, NextScript } from 'next/document';
// Any custom modifications go here...
class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* <div id="overlays" /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
