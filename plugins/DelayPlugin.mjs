export class DelayPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('DelayPlugin', (compilation, callback) => {
      setTimeout(() => {
        callback();
      }, 5000);
    });

    compiler.hooks.emit.tapAsync('DelayPlugin', (compilation, callback) => {
      setTimeout(() => {
        callback();
      }, 5000);
    });
  }
}