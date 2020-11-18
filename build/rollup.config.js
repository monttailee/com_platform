const path = require('path');
const { babel } = require('@rollup/plugin-babel');
// const typescript = require('@rollup/plugin-typescript');
const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('rollup-plugin-replace');
const sourceMaps = require('rollup-plugin-sourcemaps');
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');
const clear = require('rollup-plugin-clear');
// const autoprefixer = require('autoprefixer');
const pkg = require('../package.json');


const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const ismap = process.env.NODE_ENV == 'development' ? 'inline' : false;
const currPackage = process.env.PACKAGE;
console.log('----------------当前编译package-----------------：', currPackage)

const extensions = ['.ts', '.tsx'];

const processSass = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    sass.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err)
      }
    });
  })
}

// 入口、出口需改造成可配置
module.exports = [
  {
    input: resolveFile(`packages/${currPackage}/src/index.tsx`),
    output: [
      {
        file: resolveFile(`packages/${currPackage}/dist/index.cjs.js`),
        format: 'cjs',
        sourcemap: ismap,
        exports: 'named'
      },
      {
        file: resolveFile(`packages/${currPackage}/dist/index.esm.js`),
        format: 'es',
        sourcemap: ismap,
      },
      {
        file: resolveFile(`packages/${currPackage}/dist/index.js`),
        format: 'umd',
        name: `${currPackage}ui`,
        sourcemap: ismap,
      }
    ],
    external: [...Object.keys(pkg.peerDependencies)], //阻止第三方库被打包
    plugins: [
      clear({
        targets: [`packages/${currPackage}/dist`],
        watch: true, // default: false
      }),
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
        extensions:['css', 'scss'],
        process: processSass,
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