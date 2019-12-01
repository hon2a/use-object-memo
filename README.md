# use-object-memo

Memoizes object data, providing a reference that gets updated only when the data changes.

## Use

Memoize object data to use e.g. as dependencies in subsequent `useEffect` calls.
This is useful e.g. in hooks that accept options as object.

```javascript
import { useEffect } from 'react'
import { useObjectMemo } from '@hon2a/use-object-memo'

export function useThisCoolHook(options) {
  const optionsMemo = useObjectMemo(options)
  useEffect(() => {
    // … perform some effect that should really only be performed when the options change
  }, [optionsMemo])
} 
```

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`
- test it using `npm test`

and fix the errors, if there are any.

### Publish

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Build and publish the new version as a npm package:
    ```sh
    npm publish --access public
    ``` 
