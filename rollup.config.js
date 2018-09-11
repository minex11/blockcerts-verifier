import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/blockcerts-verifier/index.js',
  output: [
    {
      file: 'dist/main.js',
      format: 'iife',
      name: 'BlockcertsVerifier'
    }
  ],
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['env', {
        modules: false,
        'targets': {
          'node': 'current'
        }
      }]],
      plugins: ['transform-object-rest-spread', 'external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    terser()
  ]
};
