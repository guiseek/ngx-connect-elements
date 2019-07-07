module.exports = {
  name: 'svg',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/svg',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
