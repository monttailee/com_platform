const path = require('path');
const { babel } = require('@rollup/plugin-babel');
// const typescript = require('@rollup/plugin-typescript');
const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('rollup-plugin-replace');
const sourceMaps = require('rollup-plugin-sourcemaps');
const postcss = require('rollup-plugin-postcss');
const less = require('less');
const autoprefixer = require('autoprefixer');


const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const ismap = process.env.NODE_ENV == 'development' ? 'inline' : false;

const extensions = ['.ts', '.tsx'];

const processLess = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    less.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err);
      }
    });

    less.render(context, {})
    .then(function(output) {
      if( output && output.css ) {
        resolve(output.css);
      } else {
        reject({})
      }
    },
    function(err) {
      reject(err)
    });
  })
}

// 入口、出口需改造成可配置
module.exports = [
  {
    input: resolveFile('packages/com/src/index.tsx'),
    output: [
      {
        file: resolveFile('dist/com.cjs.js'),
        format: 'cjs',
        sourcemap: ismap,
        exports: 'named'
      },
      {
        file: resolveFile('dist/com.js'),
        format: 'umd',
        name: 'montaiUI',
        sourcemap: ismap,
      },
      {
        file: resolveFile('dist/com.esm.js'),
        format: 'es',
        sourcemap: ismap,
      }
    ],
    external: ['antd-mobile', 'react', 'react-dom'], //阻止第三方库被打包
    plugins: [
      typescript({
        tsconfigDefaults: {
          exclude: [
            'packages/**/src/**/*.test.ts',
            'packages/**/src/**/*.test.tsx',
          ],
          compilerOptions: {
            sourceMap: true,
            declaration: true,
            jsx: 'react',
          },
          tsconfigOverride: {
            compilerOptions: {
              // TS -> esnext, then leave the rest to babel-preset-env
              target: 'esnext',
            },
          },
        },
        typescript: require('typescript'),
      }),
      postcss({
        extract: false,//是否分离
        // modules: true,
        minimize: process.env.NODE_ENV == 'production', // zip
        process: processLess,
      }),
      nodeResolve({
        mainFields: ['module', 'main', 'browser'],
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
      sourceMaps(),
      //eslint()  //rollup-plugin-eslint 编译时校验 暂时不加入
      replace({
        // 'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV || 'development'),
        'NODE_ENV':  JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      babel({
        extensions,
        babelHelpers: 'runtime',
        include: 'packages/**/src/**/*',
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false, // 阻止 Babel 在 Rollup 处理之前，将我们的模块转成 CommonJS
              loose: true,
            },
          ],
        ],
        plugins: ['@babel/plugin-transform-runtime'],// 解决重复打包
      }),
    ]
  },
]