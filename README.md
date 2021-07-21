[![Build Status](https://travis-ci.com/serhatci/outline-express-rest-api.svg?branch=main)](https://travis-ci.com/serhatci/outline-express-rest-api)
[![Coverage Status](https://coveralls.io/repos/github/serhatci/outline-express-rest-api/badge.svg?branch=main)](https://coveralls.io/github/serhatci/outline-express-rest-api?branch=main)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github/serhatci/outline-express-rest-api)

# Outline express rest API

An npm library to summarize your express rest API endpoints and return values in your terminal

# Installation

Install library globally

```bash
npm i outline-express-rest-api -g

```

# Usage

Since library will be installed globally, you can use it with 'npx outline' comment. After outline comment, path of a single route file or folder of route files should be called as below:

```bash
npx outline sample-route-files/customers.js

```

or to summarize all route files in the routes folder:

```bash
npx outline sample-route-files

```

# Future Work

Current version is still limited to fully outline express rest API. Only http methods & route end points & express application methods are summarized.

Outlining of query strings & URL parameters will be included in the next version.

# Licence

MIT License

Copyright (c) 2021 Serhat Ciftci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
