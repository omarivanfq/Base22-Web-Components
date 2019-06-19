import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';


export const config: Config = {
  plugins: [
    sass()
  ],
  namespace: 'nova-transfer',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
