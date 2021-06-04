---
templateKey: blog-post
title: Code example
date: 2021-06-04T00:18:45.029Z
description: code example
featuredpost: true
featuredimage: /img/city.jpg
secondimage: /img/products-grid2.jpg
markdown: asdfasdfasdfasdfsafsdfasd
frases:
  - quote: Everything is awesome!
    author:
      name: Emmet
      avatar: /img/emmet.jpg
---
<!--StartFragment-->

```jsx
import React from 'react';
import useSWR from 'swr';

import fetcher from '../../lib/fetcher';

import MetricCard from './card';

function Unsplash() {
  const { data } = useSWR('/api/unsplash', fetcher);

  const downloads = new Number(data?.downloads);
  const views = new Number(data?.views);
  const link = 'https://unsplash.com/@leerob';

  return (
    <>
      <MetricCard header="Unsplash Downloads" link={link} metric={downloads} />
      <MetricCard header="Unsplash Views" link={link} metric={views} />
    </>
  );
}

export default Unsplash;
```

<!--EndFragment-->